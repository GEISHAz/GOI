// InvestmentInfo.js

import React, { useState, useEffect } from "react";
import styles from "./InvestmentInfo.module.css";
import StockExchange from "./StockExchange";

export default function InvestmentInfo({ stockInfo }) {
  // stockInfo가 유효하지 않다면 렌더링을 중단하거나 대체 컨텐츠를 렌더링합니다.
  if (!stockInfo) {
    return null; // 또는 로딩 스피너, 에러 메시지 등을 반환할 수 있습니다.
  }
  const [colorClass, setColorClass] = useState("");
  const [stockExchangeModal, setStockExchangeModal] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // 매수 또는 매도 여부 상태

  const stockExchangeModalOpen = (type) => {
    setTransactionType(type);
    setStockExchangeModal(true);
  };

  useEffect(() => {
    const percent = stockInfo.percent;

    // percent 값에 따라 적절한 클래스 설정
    if (percent > 0) {
      setColorClass(styles.upDownPercentColorRed);
    } else if (percent < 0) {
      setColorClass(styles.upDownPercentColorBlue);
    } else {
      setColorClass(styles.upDownPercentColorBlack);
    }
  }, [stockInfo]);

  return (
    <div className={styles.investmentInfo}>
      <div className={styles.bunya}>
        <p>{stockInfo.item}</p>
      </div>
      <div className={styles.jusu}>
        <p>{stockInfo.thisCost}/주</p>
      </div>
      <div className={`${styles.upDown} ${colorClass}`}>
        <p>{stockInfo.percent}%</p>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.buyButtons}
          onClick={() => stockExchangeModalOpen("buy")}
        >
          매수
        </button>
        <hr />
        <button
          className={styles.sellButtons}
          onClick={() => stockExchangeModalOpen("sell")}
        >
          매도
        </button>
      </div>
      {stockExchangeModal && (
        <StockExchange
          setStockExchangeModal={setStockExchangeModal}
          company={stockInfo.item}
          price={stockInfo.thisCost}
          percent={stockInfo.percent}
          transactionType={transactionType}
          myStock={0}
        />
      )}
    </div>
  );
}
