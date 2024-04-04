import React from "react";
import { useEffect, useState, useRef } from "react";
import styles from "./LastTurnStockInfo.module.css";
import LastTurnStockDetail from "./LastTurnStockDetail";
import axios from "axios";

export default function LastTurnStockInfo({
  setLastTurnStockModal,
  lastTurnStock,
}) {
  const modalBackGround = useRef();
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");

  useEffect(() => {
    setTimeout(() => {
      setLastTurnStockModal(false);
    }, 4990);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      axios
        .put(
          `https://j10d202.p.ssafy.io/api/game/end/${roomId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          setLastTurnStockModal(false);
        })
        .catch((error) => {
          console.error("게임 종료 요청에 실패했습니다:", error);
        });
    }, 3000);
  }, []);

  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      // onClick={(e) => {
      // if (e.target === modalBackGround.current) {
      //   setLastTurnStockModal(false);
      // }}
      // }
    >
      <div className={styles.container}>
        {lastTurnStock.map((info, index) => (
          <LastTurnStockDetail
            key={index}
            className={styles.investmentInfo}
            stockInfo={info}
          />
        ))}
      </div>
    </div>
  );
}
