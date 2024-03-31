// import React from 'react'
import styles from "./MyStock.module.css";
import { useEffect, useRef } from "react";

import MyStockDetail from "./MyStockDetail";
import axios from "axios";

export default function MyStock(props) {
  const myStockBackground = useRef();
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("https://j10d202.p.ssafy.io/api/stock", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("내 보유 주식 정보 가져오기 성공");
      })
      .catch((error) => {
        console.log(error);
        console.log("내 보유 주식 정보 가져오기 실패");
      });
  }, []);

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
