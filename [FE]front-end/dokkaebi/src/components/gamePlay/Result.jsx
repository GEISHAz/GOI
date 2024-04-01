import React, { useRef } from "react";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";

export default function Result({ setResultModal, result }) {
  const modalBackGround = useRef();
  const navigate = useNavigate();
  const channelId = sessionStorage.getItem("channelId");
  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setResultModal(false);
          navigate(`/square/${channelId}`);
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
