// InvestmentInfo.js

import React, { useState, useEffect } from "react";
import styles from "./InvestmentInfo.module.css";
import StockExchange from "./StockExchange";

export default function InvestmentInfo(props) {
  const [colorClass, setColorClass] = useState("");
  const [stockExchangeModal, setStockExchangeModal] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // 매수 또는 매도 여부 상태

  const stockExchangeModalOpen = (type) => {
    setTransactionType(type);
    setStockExchangeModal(true);
  };

  useEffect(() => {
    const percent = props.percent;

    // percent 값에 따라 적절한 클래스 설정
    if (percent > 0) {
      setColorClass(styles.upDownPercentColorRed);
    } else if (percent < 0) {
      setColorClass(styles.upDownPercentColorBlue);
    } else {
      setColorClass(styles.upDownPercentColorBlack);
    }
  }, [props.percent]);

  return (
    <div className={styles.investmentInfo}>
      <div className={styles.bunya}>
        <p>{props.company}</p>
      </div>
      <div className={styles.jusu}>
        <p>{props.price}/주</p>
      </div>
      <div className={`${styles.upDown} ${colorClass}`}>
        <p>{props.percent}%</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buyButtons} onClick={() => stockExchangeModalOpen("buy")}>매수</button>
        <hr />
        <button className={styles.sellButtons} onClick={() => stockExchangeModalOpen("sell")}>매도</button>
      </div>
      {stockExchangeModal && (
        <StockExchange
          setStockExchangeModal={setStockExchangeModal}
          company={props.company}
          price={props.price}
          percent={props.percent}
          transactionType={transactionType}
          myStock={0}
        />
      )}
    </div>
  );
}
