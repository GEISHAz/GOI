import React, { useRef } from "react";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";
import fUser from "../../images/gamePlay/1st.png";
import sUser from "../../images/gamePlay/2nd.png";
import tUser from "../../images/gamePlay/3rd.png";
import luser from "../../images/gamePlay/pngegg.png";

export default function Result({
  setResultModal,
  result,
  stompClientRef,
  gameStompRef,
}) {
  const modalBackGround = useRef();
  const navigate = useNavigate();
  const channelId = sessionStorage.getItem("channelId");

  const getUserImage = (index) => {
    if (index === 0) {
      return fUser;
    } else if (index === 1) {
      return sUser;
    } else if (index === 2) {
      return tUser;
    } else {
      return luser;
    }
  };

  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setResultModal(false);

          console.log(
            "나갈 때 연결되어있는지 확인 :",
            stompClientRef.current.connected
          );
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
        <h1 className={styles.title}>게임 결과</h1>
        {result.map((user, index) => (
          <div key={index} className={styles.userInfoContainer}>
            <img
              className={styles.imgTag}
              src={getUserImage(index)}
              alt={index >= 3 ? "4위" : ""}
            />
            <div className={styles.myInfos}>
              <p>{`닉네임: ${user.userNick}`}</p>
              <p>{`평가금액: ${user.totalCost
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
              <p>{`경험치: ${user.exp
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
