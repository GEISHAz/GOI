import React from "react";
import { useEffect, useState } from "react";
import styles from "./LastTurnStockDetail.module.css";

export default function LastTurnStockDetail({ stockInfo }) {
  const [colorClass, setColorClass] = useState("");

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
  }, [stockInfo.percent]);
  return (
    <div>
      <div>
        <div className={styles.investmentInfo}>
          <div className={styles.bunya}>
            <p>{stockInfo.item}</p>
          </div>
          <div className={`${styles.jusu} ${colorClass}`}>
            <p>
              {stockInfo.thisCost
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              /주
            </p>
          </div>
          <div className={`${styles.upDown} ${colorClass}`}>
            <p>{stockInfo.percent}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
