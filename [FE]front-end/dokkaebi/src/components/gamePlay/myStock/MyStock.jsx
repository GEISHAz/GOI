// import React from 'react'
import styles from "./MyStock.module.css";
import { useRef } from "react";

import MyStockDetail from "./MyStockDetail";

export default function MyStock(props) {
  const myStockBackground = useRef();

  return (
    <div
      className={styles.background}
      ref={myStockBackground}
      onClick={(e) => {
        if (e.target === myStockBackground.current) {
          props.setMyStockModal(false);
        }
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>내 보유 주식</h1>
        <div className={styles.myStockDetail}>
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
          <MyStockDetail company="A IT" price="94520000" having="1234" />
        </div>
      </div>
    </div>
  );
}
