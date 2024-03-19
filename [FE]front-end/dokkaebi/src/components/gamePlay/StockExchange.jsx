import React, { useRef } from "react";
import styles from "./StockExchange.module.css";

export default function StockExchange(props) {
  const stockExchangeBackground = useRef();

  return (
    <div
      className={styles.background}
      ref={stockExchangeBackground}
      onClick={(e) => {
        if (e.target === stockExchangeBackground.current) {
          props.setStockExchangeModal(false);
        }
      }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={styles.container}>
        <p>fdasfsaf</p>
      </div>
    </div>
  );
}
