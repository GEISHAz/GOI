import React, { useRef } from "react";
import styles from "./Result.module.css";

export default function Result({ setResultModal, result }) {
  const myStockBackground = useRef();
  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setResultModal(false);
        }
      }}
    >
      <div className={styles.container}>
        {result.map((user, index) => (
          <div key={index}>
            <p>{`User Nick: ${user.userNick}`}</p>
            <p>{`Total Cost: ${user.totalCost}`}</p>
            <p>{`exp: ${user.point}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
