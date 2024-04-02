import React, { useRef } from "react";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";

export default function Result({ setResultModal, result, stompClientRef, gameStompRef }) {
  const modalBackGround = useRef();
  const navigate = useNavigate();
  const roomId = sessionStorage.getItem("roomId");
  const isManager = sessionStorage.getItem("isManager");
  const channelId = sessionStorage.getItem("channelId");
  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setResultModal(false);


          console.log("나갈 때 연결되어있는지 확인 :", stompClientRef.current.connected)
          if (stompClientRef.current && stompClientRef.current.connected) {
            if (gameStompRef.current) {
              console.log("게임을 나가서 구독을 끊을게요");
              gameStompRef.current.unsubscribe();
              gameStompRef.current = null;
            }

            // WebSocket 연결 끊기
            stompClientRef.current.disconnect(() => {
              console.log("게임을 나가서 확실하게 연결을 끊을게요");
              sessionStorage.removeItem("roomId");
              sessionStorage.removeItem("isManager");
              navigate(`/square/${channelId}`);
            });
          }
        }
      }}
    >
      <div className={styles.container}>
        {result.map((user, index) => (
          <div key={index} className={styles.userInfoContainer}>
            <p>{`User Nick: ${user.userNick}`}</p>
            <p>{`Total Cost: ${user.totalCost}`}</p>
            <p>{`exp: ${user.point}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
