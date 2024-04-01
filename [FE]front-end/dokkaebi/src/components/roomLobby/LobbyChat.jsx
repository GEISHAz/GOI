import React, { useEffect, useRef, useState } from "react";
import styles from "./LobbyChat.module.css";
import { useSelector } from 'react-redux';

export default function LobbyChat({ handleSendMessages, chatList, userNickname }) {
  const recentMessages = useRef(null);
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    handleSendMessages(inputMessage);
    setInputMessage(""); // 메시지 전송 후 입력 필드 초기화
  };

  const scrollToBottom = () => {
    // console.log("최신 채팅내역 불러옴");
    recentMessages.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatList.length]);

  return (
    <div className={styles.chatComp}>
      <div className={styles.msgArea}>
        {chatList.map((message, index) => (
          <div
            key={index}
            ref={recentMessages}
            className={
              message.sender === userNickname ? styles.chat_ends : styles.chat_starts
            }
          >
            <div className={styles.chat_bubbles}>
              <strong className="ml-2">{message.sender} : </strong>
              <span>{message.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatAreas}>
        <form onSubmit={sendMessage}>
          <div className="flex">
            <input
              type="text"
              className={styles.chatInputs}
              value={inputMessage}
              maxLength={100}
              onChange={handleInputChange}
            />
            <div className={styles.submitDivs}>
              <button
                type="submit"
                className={`${styles.chat_buttons} h-8 text-white font-bold text-center`}
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
