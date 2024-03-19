import React from "react";
import styles from "./MyStockDetail.module.css";

export default function MyStockDetail(props) {
  return (
    <div className={styles.background}>
      <div className={styles.companyArea}>{props.company}</div>
      <div className={styles.priceArea}>{props.price}/주</div>
      <div className={styles.havingArea}>{props.having}주 보유</div>
    </div>
  );
}
