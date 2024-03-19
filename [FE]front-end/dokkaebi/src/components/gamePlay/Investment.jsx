// import React from 'react'
import styles from "./Investment.module.css";
import InvestmentInfo from "./InvestmentInfo";

export default function Investment() {
  return (
    <div className={styles.container}>
      <div className={styles.listName}>
        <p>회사</p>
        <p className={styles.juGa}>주가</p>
        <p className={styles.gap}>등락폭</p>
        <p className={styles.sudo}>매수/매도</p>
      </div>
      <div className={styles.investmentInfoArea}>
        <InvestmentInfo company="A IT" price="990866800" percent="-30" />
        <InvestmentInfo company="B 화학" price="2000" percent="25" />
        <InvestmentInfo company="C 식품" price="35000" percent="11" />
        <InvestmentInfo company="D 바이오" price="27000" percent="-5" />
        <InvestmentInfo company="E 자동차" price="1050" percent="0" />
        <InvestmentInfo company="F 항공" price="982000" percent="300" />
        <InvestmentInfo company="G 뷰티" price="363820000" percent="-50" />
        <InvestmentInfo company="H 엔터" price="320000" percent="-45" />
        <InvestmentInfo company="I 통신" price="54325380" percent="500" />
      </div>
    </div>
  );
}
