import React from "react";
import styles from "./MyStockDetail.module.css";

export default function MyStockDetail(props) {
  return (
    <div className={styles.background}>
      <div className={styles.companyArea}>{props.item}</div>
      <div className={styles.priceArea}>{props.nowVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/주</div>
      <div className={styles.danga}>{props.buyVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div className={styles.havingArea}>{props.shares}주 보유</div>
      <div className={styles.roiArea}>{props.roi}</div>
    </div>
  );
}
