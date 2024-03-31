import Background from "../../images/gamePlay/background6.gif";
import LobbyTop from "../../components/roomLobby/LobbyTop.jsx";
import PlayerList from "../../components/roomLobby/PlayerList.jsx";
import LobbyChat from "../../components/roomLobby/LobbyChat.jsx";
// import GoSqaure from '../../components/back/goSquare.jsx';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
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
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");
  const userId = sessionStorage.getItem("userId");

  const location = useLocation();

  const stompClientRef = useRef(null);

  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";
  const [response, setResponse] = useState(location.state.response.data);
  const [userList, setUserList] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [amIManager, setAmIManager] = useState(false);

  useEffect(() => {
    // console.log("gkrltlfgek", response);
    if (response.userList) {
      setUserList(response.userList);
    } else {
      setUserList(response);
    }
  }, [response]);

  useEffect(() => {
    // console.log("방 유저 리스트 확인0", response);
    // console.log("방 유저 리스트 확인1", userList);
    // console.log("방 유저 리스트 확인", location.state.res.data);
    // console.log(location.state.content);
    userList.forEach((user) => {
      userList.forEach((user) => {
        if (user.userId === Number(userId)) {
          setAmIManager(user.isManager);
          sessionStorage.setItem("isManager", user.isManager);
        }
        console.log("나는 방장 : ", amIManager);
      });
    });
  }, [userList]);

  useEffect(() => {
    let reconnectInterval;

    const socket = new SockJS(socketUrl);
    // const stompClient = Stomp.over(socket);
    stompClientRef.current = Stomp.over(socket);
    console.log("스톰프 확인", stompClientRef.current);

    stompClientRef.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        console.log("구독 시도");
        console.log("방 번호 :", roomId);
        stompClientRef.current.subscribe(
          "/sub/room/chat/" + `${roomId}`,
          (message) => {
            // console.log("구독 성공");
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage);
            // console.log(receivedMessage.type);

            if (receivedMessage.type === "ROOM_ENTER") {
              console.log("타입 확인", receivedMessage.type);
              setUserList(receivedMessage.data);
              console.log("소켓으로 받은 유저정보 확인", userList);
            } else if (receivedMessage.type === "ROOM_EXIT") {
              console.log(receivedMessage.type);
              setUserList(receivedMessage.data);
            } else if (receivedMessage.type === "READY") {
              console.log(receivedMessage.type);
              // console.log(receivedMessage.data.list);
              setUserList(receivedMessage.data.list);
              setIsStart(receivedMessage.data.ready);
            } else if (receivedMessage.type === "START") {
              console.log(receivedMessage.data);
              navigate(`/game/${roomId}`);
            }
          }
        );
      },
      (error) => {
        // 연결이 끊어졌을 때 재연결을 시도합니다.
        console.log("STOMP: Connection lost. Attempting to reconnect", error);
        reconnectInterval = setTimeout(connect, 1000); // 1초 후 재연결 시도
      }
    );

    return () => {
      console.log("unmounting...");
      console.log(stompClientRef.current);

      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, []);

  return (
    <div style={backgroundStyle}>
      <LobbyTop userList={userList} isStart={isStart} />
      {/* 로비에 들어온 유저 리스트와 로비 채팅 컨테이너 */}
      <div className="flex flex-col items-center">
        <PlayerList userList={userList} />
        <LobbyChat />
      </div>
    </div>
  );
}
