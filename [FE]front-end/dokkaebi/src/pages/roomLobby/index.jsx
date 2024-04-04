import Background from "../../images/gamePlay/background6.gif";
import LobbyTop from "../../components/roomLobby/LobbyTop.jsx";
import PlayerList from "../../components/roomLobby/PlayerList.jsx";
import LobbyChat from "../../components/roomLobby/LobbyChat.jsx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserCnt } from "../../features/square/roomSlice.js";
import React, { useRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import styles from "./index.module.css";
import axios from "axios";

export default function userReadyRoom() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  };
  const navigate = useNavigate();
  const roomNum = useSelector((state) => state.room.roomNum);
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");
  const userId = sessionStorage.getItem("userId");
  const location = useLocation();
  const stompClientRef = useRef(null);
  const roomStompRef = useRef(null);
  const userNickname = useSelector((state) => state.auth.userNickname);
  const channelId = sessionStorage.getItem("channelId");
  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";
  const [response, setResponse] = useState(location.state.response.data);
  const [userList, setUserList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [amIManager, setAmIManager] = useState(false);

  useEffect(() => {
    // 새로고침시 유저 리스트 다시 받아오게하기 위한 코드
    axios
      .get(`https://j10d202.p.ssafy.io/api/room/userlist/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) =>
        console.error("방 정보를 받아오는 중 에러 발생", error)
      );
  }, []);

  useEffect(() => {
    if (response.userList) {
      // console.log("유저 리스트 확인 :", response.userList);
      setUserList(response.userList);
    } else {
      setUserList(response);
    }
  }, [response]);

  useEffect(() => {
    userList.forEach((user) => {
      if (user.userId === Number(userId)) {
        setAmIManager(user.isManager);
        sessionStorage.setItem("isManager", user.isManager);
      }
      // console.log("나는 방장 : ", amIManager);
    });
  }, [userList]);

  useEffect(() => {
    let reconnectInterval;

    const socket = new SockJS(socketUrl);
    // const stompClient = Stomp.over(socket);
    stompClientRef.current = Stomp.over(socket);
    // console.log("스톰프 확인", stompClientRef.current);

    stompClientRef.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        // console.log("로비방 웹소켓 연결할게요!");
        // console.log("roomLobby 방 번호 :", roomId);
        roomStompRef.current = stompClientRef.current.subscribe(
          "/sub/room/chat/" + `${roomId}`,
          (message) => {
            // console.log("구독 성공");
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage);
            // console.log(receivedMessage.type);
            if (receivedMessage.type && receivedMessage.type === "TALK") {
              setChatList((chatList) => [
                ...chatList,
                {
                  sender: receivedMessage.sender,
                  message: receivedMessage.message,
                },
              ]);
            }

            if (receivedMessage.type && receivedMessage.type === "ROOM_KICK") {
              // console.log("강퇴 로직 실행된 후 새로 받은 데아터 확인", receivedMessage.data);
              setUserList(receivedMessage.data);

              // 강퇴된 유저가 자신인지 확인
              const isKicked = !receivedMessage.data.some(
                (user) => user.userId === Number(userId)
              );
              if (isKicked) {
                alert("강퇴당했어요 !");

                if (
                  stompClientRef.current &&
                  stompClientRef.current.connected
                ) {
                  stompClientRef.current.unsubscribe(); // 현재 구독 해제

                  stompClientRef.current.disconnect(() => {
                    // WebSocket 연결 끊기
                    // console.log("강퇴 당하여 연결이 끊어집니다!");
                  });
                }

                sessionStorage.removeItem("roomId"); // 방 ID 세션에서 제거
                navigate(`/square/${channelId}`);
              }
            }

            if (receivedMessage.type === "ROOM_ENTER") {
              // console.log("받는 데이터 확인", receivedMessage.data);
              // console.log("누군가 입장했어요");
              setUserList(receivedMessage.data);
              // Redux 스토어의 userCnt 업데이트
              // console.log("유저 수 확인 :", receivedMessage.data.userList);
              const newUserCnt = receivedMessage.data.userList.length;
              dispatch(setUserCnt(newUserCnt));
              // console.log("소켓으로 받은 유저정보 확인", userList);
            } else if (receivedMessage.type === "ROOM_EXIT") {
              // console.log(receivedMessage.type);
              //console.log("누군가 퇴장했어요");
              setUserList(receivedMessage.data);
            } else if (receivedMessage.type === "READY") {
              // console.log(receivedMessage.type);
              // console.log(receivedMessage.data.list);
              setUserList(receivedMessage.data.list);
              setIsStart(receivedMessage.data.ready);
            } else if (receivedMessage.type === "START") {
              // 게임이 시작했으므로 끊어주고 넘어가기
              if (stompClientRef.current && stompClientRef.current.connected) {
                // 구독 해제
                if (roomStompRef.current) {
                  roomStompRef.current.unsubscribe();
                  roomStompRef.current = null; // 구독 참조 초기화
                }

                // WebSocket 연결 끊기
                stompClientRef.current.disconnect(() => {
                  // console.log(
                  //   "게임을 시작하여 연결을 끊습니다. gamePlay 페이지에서 새로 연결합니다."
                  // );

                  // 연결이 완전히 끊긴 후 navigate 실행
                  navigate(`/game/${roomId}`);
                });

                return; // 이 부분을 추가하여 연결 해제 후 navigate가 실행되기 전에 함수 실행을 멈춤
              }
              // 만약 연결이 이미 끊겼다면 바로 navigate 실행
              navigate(`/game/${roomId}`);
            }
          }
        );
      },
      (error) => {
        // 연결이 끊어졌을 때 재연결을 시도합니다.
        // console.log("STOMP: Connection lost. Attempting to reconnect", error);
        reconnectInterval = setTimeout(connect, 1000); // 1초 후 재연결 시도
      }
    );

    return () => {
      // console.log("로비방 웹소켓 연결 끊을게요!")
      if (roomStompRef.current) {
        roomStompRef.current.unsubscribe(); // 구독 해제
      }
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          // console.log("WebSocket 연결이 종료되었습니다.");
        });
      }

      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, [accessToken, roomId]);

  // 메세지 보내기 함수
  const handleSendMessages = (message) => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      message.trim() !== ""
    ) {
      const newMessages = {
        roomId: roomId,
        sender: userNickname,
        message: message,
        type: "TALK",
      };
      // console.log("메시지 채팅 하나를 보냈어요.");
      // console.log("sender 확인 :", newMessages.sender);

      stompClientRef.current.send(
        `/pub/room/chat/message/`,
        {},
        JSON.stringify(newMessages)
      );
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.");
      // console.error("STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요");
    }
  };

  // 유저 강퇴 함수
  const handleKick = async (userIdToKick) => {
    try {
      // console.log("내보내려는 유저 id :", userIdToKick)
      // console.log("현재 방 번호 :", roomId)
      await axios.put(
        "https://j10d202.p.ssafy.io/api/room/kick",
        {
          userId: userIdToKick,
          roomId: roomId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("강퇴했어요");
      // 강퇴 처리 후유저 리스트를 다시 업데이트
      // setUserList(response.data);
    } catch (error) {
      console.error("강퇴 처리 중 에러 발생", error);
      alert("강퇴 처리 중 문제가 발생했습니다.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <LobbyTop userList={userList} isStart={isStart} />
      {/* 로비에 들어온 유저 리스트와 로비 채팅 컨테이너 */}
      <div className="flex flex-col items-center">
        <PlayerList
          userList={userList}
          isStart={isStart}
          amIManager={amIManager}
          handleKick={handleKick}
          roomNum={roomNum}
        />
        <div className={`flex justify-center ${styles.chatSuperCont}`}>
          <LobbyChat
            handleSendMessages={handleSendMessages} // 메세지 보내기 함수
            chatList={chatList} // 채팅 내역 props
            userNickname={userNickname}
          />
        </div>
      </div>
    </div>
  );
}
