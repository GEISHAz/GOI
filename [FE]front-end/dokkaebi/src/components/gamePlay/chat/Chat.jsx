import React, { useRef, useEffect, useState } from "react";
import styles from './Chat.module.css'
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import ToggleUp from '../../../images/gamePlay/toggleUp.gif';
import ToggleDown from '../../../images/gamePlay/toggleDown.gif';

export default function Chat({ roomId, userNicks }) {
  const accessToken = sessionStorage.getItem("accessToken");
  const client = useRef(null);
  const subGameRef = useRef(null); // 구독 식별 번호
  const recentMessage = useRef(null); // 최근 메세지로 이동
  const sender = useSelector((state) => state.auth.userNickname); // 보내는 이
  const [chatList, setChatList] = useState([]); // 채팅 내역 관리
  const [inputMessage, setInputMessage] = useState(""); // 입력 메세지 관리
  const [targetNick, setTargetNick] = useState(''); // 귓속말 보낼 대상 관리
  const [chatHeight, setChatHeight] = useState("120px"); // 채팅창 높이 조절 관리

  // 채팅창 토글 버튼 클릭 핸들러
  const toggleChatHeight = () => {
    setChatHeight(chatHeight === "120px" ? "360px" : "120px");
  };

  useEffect(() => {
    const socket = new SockJS("https://j10d202.p.ssafy.io/ws-stomp");
    client.current = Stomp.over(socket);
    // console.log("스톰프 확인", client.current);
    
    client.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        console.log(">>게임에서 채팅 연결<<");
        console.log("현재 게임 방 번호 :", roomId);
        subGameRef.current = client.current.subscribe(
          "/sub/game/chat/" + `${roomId}`,
          (message) => {
            // console.log("구독 성공");
            const msg = JSON.parse(message.body);
            console.log(msg);
            if (msg.type && msg.type === "TALK") {
              setChatList((chatList) => [
                ...chatList,
                { sender: msg.sender, message: msg.message },
              ]);
            }
          }
        );
      },
      (error) => {
        console.error("채팅 연결 에러", error);
      }
    );

    return () => {
      if (subGameRef.current) {
        subGameRef.current.unsubscribe(); // 구독 식별 번호 찾아서 해제
      }

      if (client.current && client.current.connected) {
        client.current.disconnect(); // 연결 끊기
      }

    };
  }, [roomId]);

  // 메시지 보내기 조작할 함수
  const SendMessage = (event) => {
    if (event) {
      event.preventDefault();
    }

    if (client.current && client.current.connected && inputMessage.trim() !== "") {
      let newMessage = {
        roomId: roomId,
        sender: sender,
        message: inputMessage,
        type: targetNick !== '' ? "WHISPER" : "TALK",
      };
  
      // 귓속말을 보낼 경우 receiver 추가
      if (targetNick !== '') {
        newMessage = { ...newMessage, receiver: targetNick };
      }
  
      // 메시지 전송
      client.current.send(`/pub/game/chat/message`, {}, JSON.stringify(newMessage));
  
      // UI에 메시지 반영
      setChatList([...chatList, newMessage]);
  
      // 입력 필드 초기화
      setInputMessage("");
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.");
      console.error("STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요");
    }
  };

  // // 메세지 보내기 조작할 함수
  // const SendMsg = (event) => {
  //   // 새로고침 방지
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   if (
  //     client.current &&
  //     client.current.connected &&
  //     inputMessage.trim() !== ""
  //   ) {
  //     const newMessage = {
  //       roomId: roomId,
  //       sender: sender,
  //       message: inputMessage,
  //       type: "TALK",
  //       receiver: null,
  //     };
  //     console.log("메시지 채팅 하나를 보냈어요.");
  //     console.log("sender 확인 :", newMessage.sender);

  //     client.current.send(
  //       `/pub/game/chat/message/`,
  //       {},
  //       JSON.stringify(newMessage)
  //     );
  //     // setChatList([...chatList, newMessage]);
  //     setInputMessage("");
  //   } else {
  //     alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.");
  //     console.error("STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요");
  //   }
  // };

  // // 귓속말 보내기 로직
  // const sendWhisper = () => {
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   if (
  //     client.current &&
  //     client.current.connected &&
  //     inputMessage.trim() !== ""
  //   ) {
  //     const messageData = {
  //       roomId: roomId,
  //       sender: sender,
  //       message: inputMessage,
  //       type: "WHISPER",
  //       receiver: userNicks,
  //     };
  //     console.log("귓속말을 보냈어요")
  //     console.log("sender 확인 :", messageData.sender);
  //     // 메시지 전송 로직
  //     client.current.send(
  //       "/pub/game/chat/message/",
  //        {},
  //        JSON.stringify(messageData)
  //     );
  //     setInputMessage("");
  //   } else {
  //     alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.");
  //     console.error("귓속말 연결 에러");
  //   }
  // };

  // 메시지 input 작동
  const handleInputChanges = (e) => {
    setInputMessage(e.target.value);
  };

  // 채팅창 스크롤
  const scrollToBottoms = () => {
    console.log("최신 채팅내역 불러옴");
    recentMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottoms();
  }, [chatList.length]);

  return (
    <div className={styles.gameChatCont} style={{ height: chatHeight }}>
      {/* 높이 조절 버튼 */}
      <div className="flex justify-end">
        <button onClick={toggleChatHeight} className={`flex justify-end ${styles.toggleButton}`}>
          {chatHeight === "120px" ? (
            <img src={ToggleUp} alt="Toggle chat up" />
          ) : (
            <img src={ToggleDown} alt="Toggle chat down" />
          )}
        </button>
      </div>
      {/* 게임 채팅창 내역 */}
      <div className={styles.msgCont}>
        {chatList.map((message, index) => (
          <div
            key={index}
            ref={recentMessage}
            className={
              message.sender === sender ? styles.chat_end : styles.chat_start
            }
          >
            <div className={styles.chat_bubs}>
              <strong className="ml-2">{message.sender} : </strong>
              <span className={styles.showMessage}>{message.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 메세지 보내는 영역 */}
      <div className={styles.gameChatArea}>
        <form onSubmit={SendMessage}>
          <div className="flex">
            <select className={styles.whisperSelect} value={targetNick} onChange={e => setTargetNick(e.target.value)}>
              <option value="">전체</option>
              {userNicks.map((nick, index) => (
                <option key={index} value={nick}>{nick}에게</option>
              ))}
            </select>
            <input
              type="text"
              className={styles.gameInput}
              value={inputMessage}
              maxLength={100}
              onChange={handleInputChanges}
            />
            <div className={styles.gameSubmitDiv}>
              <button
                type="submit"
                className={`${styles.submitButtons} h-8 text-white font-bold text-center`}
              >
                입력
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
