import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatContainer.module.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useSelector } from "react-redux";

export default function ChatContainer() {
  const sender = useSelector((state) => state.auth.userNickname);
  // const userId = sessionStorage.getItem("userId");
  const [chatList, setChatList] = useState([]);
  // const [chatMessage, setChatMessage] = useState('')
  const [inputMessage, setInputMessage] = useState("");
  const recentMessage = useRef(null);
  const stompClient = useRef(null);
  const subscriptionRef = useRef(null); // 구독할 때 식별자 지정
  const channelId = sessionStorage.getItem("channelId");

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    // console.log("유즈이펙트 확인!!!!")
    const socket = new SockJS("https://j10d202.p.ssafy.io/ws-stomp");
    // console.log('웹소켓 상태 확인 :', SockJS)
    stompClient.current = Stomp.over(socket);
    // console.log("스톰프 클라이언트 확인 :", stompClient.current)

    // 유저 연결
    stompClient.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        // console.log("광장에서 채널 연결됨!!");

        // 구독하기
        subscriptionRef.current = stompClient.current.subscribe(
          "/sub/square/chat/" + `${channelId}`,
          (message) => {
            // 받은 메세지 처리할 곳
            const msg = JSON.parse(message.body);
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
      console.log("광장 채팅 연결 끊어요!")
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe(); // 구독 식별자 번호를 찾아서 구독 취소
      }
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [channelId]);

  // 메세지 보내기 조작할 함수
  const handleSendMessage = (event) => {
    // 새로고침 방지
    if (event) {
      event.preventDefault();
    }

    if (
      stompClient.current &&
      stompClient.current.connected &&
      inputMessage.trim() !== ""
    ) {
      const newMessage = {
        roomId: channelId,
        sender: sender,
        message: inputMessage,
        type: "TALK",
      };
      // console.log("메시지 채팅 하나를 보냈어요.");
      // console.log("sender 확인 :", newMessage.sender);

      stompClient.current.send(
        `/pub/square/chat/message`,
        {},
        JSON.stringify(newMessage)
      );
      // setChatList([...chatList, newMessage]);
      setInputMessage("");
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.");
      console.error("STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요");
    }
  };

  // 메시지 input 작동
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 채팅창 스크롤
  const scrollToBottom = () => {
    // console.log("최신 채팅내역 불러옴");
    recentMessage.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList.length]);

  return (
    <div className={styles.chatComponents}>
      <div className={styles.messageArea}>
        {chatList.map((message, index) => (
          <div
            key={index}
            ref={recentMessage}
            className={
              message.sender === sender ? styles.chat_end : styles.chat_start
            }
          >
            <div className={styles.chat_bubble}>
              <strong className="ml-2">{message.sender} : </strong>
              <span>{message.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatArea}>
        {/* <div className={styles.chatTo}> */}
        {/* <span className="flex justify-center my-auto text-center">채팅</span> */}
        {/* </div> */}
        <form onSubmit={handleSendMessage}>
          <div className="flex">
            <input
              type="text"
              className={styles.chatInput}
              value={inputMessage}
              maxLength={100}
              onChange={handleInputChange}
            />
            <div className={styles.submitDiv}>
              <button
                type="submit"
                className={`${styles.chat_button} h-8 text-white font-bold text-center`}
              >
                입력
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
