import React, { useRef } from "react";
import styles from "./StockExchange.module.css";
import chart from '../../images/gamePlay/StockChart.jpg'

export default function StockExchange(props) {
  const stockExchangeBackground = useRef();
  const onErrorChartImg = (e) => {
    e.target.src = chart
  }

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
          <img src="" alt="chart" onError={onErrorChartImg} className={styles.chartImg}/>
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
              <p>900000</p>
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
              <input type="number" min="0" className={styles.inputNumber} placeholder="매수할 주 수를 입렵해주세요"/>
              <div className={styles.ju}><p>주</p></div>
            </div>
            <button className={styles.maesuButton}>매수</button>
          </div>
        </div>
      </div>
    </div>
  );
}
