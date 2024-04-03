// import React from 'react'
import styles from "./MyStock.module.css";
import { useEffect, useRef, useState } from "react";

import MyStockDetail from "./MyStockDetail";
import axios from "axios";

export default function MyStock(props) {
  const myStockBackground = useRef();
  const accessToken = sessionStorage.getItem("accessToken");
  const [total, setTotal] = useState(0);
  const [rest, setRest] = useState(0);
  const [yoy, setYoy] = useState(0);
  const [myStocks, setMyStocks] = useState([]);

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
        setTotal(response.data.marketVal);
        setRest(response.data.remainVal);
        setYoy(response.data.yoy);
        setMyStocks(response.data.breakDowns);
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
        <hr className={styles.myInfosHr} />
        <div className={styles.myInfosArea}>
          <div className={styles.myInfos}>
            <div className={styles.total}>
              <p className={styles.totalText}>평가 금액</p>
              <p className={styles.totalValue}>
                {total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className={styles.yoy}>
              <p className={styles.yoyText}>작년 대비</p>
              <p className={styles.yoyValue}>
                {yoy?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className={styles.rest}>
              <p className={styles.restText}>현금</p>
              <p className={styles.restValue}>
                {rest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.myInfosHr} />
        <div className={styles.myInfosHeader}>
          <p className={styles.itemHeader}>회사</p>
          <p className={styles.averagePriceHeader}>평단가</p>
          <p className={styles.havingHeader}>보유주</p>
          <p className={styles.roiHeader}>수익률</p>
        </div>
        <div className={styles.myStockDetail}>
          {myStocks.map((stock, index) => (
            <MyStockDetail
              key={index}
              item={stock.item} // 주식 이름
              nowVal={stock.nowVal} // 현재 가격
              shares={stock.shares} // 보유 주 수
              roi={stock.roi} // 수익률
              setMyStockModal={props.setMyStockModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
