import React, { useState, useEffect } from "react";
import styles from "./InvestmentInfo.module.css";
import StockExchange from "../../components/gamePlay/StockExchange";

export default function InvestmentInfo(props) {
  const [colorClass, setColorClass] = useState("");
  const [stockExchangeModal, setStockExchangeModal] = useState(false);

  const stockExchangeModalOpen = () => {
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
        <button className={styles.buyButtons} onClick={stockExchangeModalOpen}>
          매수
        </button>
        <hr />
        <button className={styles.sellButtons}>매도</button>
      </div>
      {stockExchangeModal && (
        <StockExchange setStockExchangeModal={setStockExchangeModal} />
      )}
    </div>
  );
}
