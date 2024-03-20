
import React, { useRef, useState } from "react";
import styles from "./StockExchange.module.css";
import chart from '../../../images/gamePlay/StockChart.jpg'

export default function StockExchange(props) {
  const [quantity, setQuantity] = useState(0); // 매수 또는 매도할 주 수 상태
  const stockExchangeBackground = useRef();
  const onErrorChartImg = (e) => {
    e.target.src = chart;
  };

  // 매수 또는 매도 버튼 클릭 시 실행되는 함수
  const handleTransaction = () => {
    if (props.transactionType === "buy") {
      // 매수 로직
      console.log("매수할 주 수:", quantity);
    } else if (props.transactionType === "sell") {
      // 매도 로직
      console.log("매도할 주 수:", quantity);
    }
    // 모달 닫기
    props.setStockExchangeModal(false);
  };

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
        <div className={styles.companyInfoArea}>
          <h1 className={styles.companyName}>{props.company}</h1>
          {/* 주식차트 예시 */}
          <img
            src=""
            alt="chart"
            onError={onErrorChartImg}
            className={styles.chartImg}
          />
        </div>
        <div className={styles.myStockInfo}>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>보유주</p>
            <div className={styles.text}>
              <p>9000</p>
              <span>▶</span>
              <p>9999</p>
            </div>
          </div>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>주당 가격</p>
            <div className={styles.text}>
              <p>{props.price}</p>
            </div>
          </div>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>보유 현금</p>
            <div className={styles.text}>
              <p>4327852093</p>
              <span>▶</span>
              <p>5000000</p>
            </div>
          </div>
          <div className={styles.buyAndSellButton}>
            <div className={styles.inputSelectorArea}>
              <input
                type="number"
                min="0"
                className={styles.inputNumber}
                placeholder={`매${props.transactionType === "buy" ? "수" : "도"}할 주 수를 입력해주세요`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className={styles.ju}>
                <p>주</p>
              </div>
            </div>
            <button className={props.transactionType === "buy" ? styles.maesuButton : styles.maedoButton} onClick={handleTransaction}>
              {props.transactionType === "buy" ? "매수" : "매도"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
