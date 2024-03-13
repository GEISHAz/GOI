// import React from 'react'
import styles from './InvestmentInfo.module.css'

export default function InvestmentInfo() {
  return (
    <div className={styles.investmentInfo}>
      <div className={styles.bunya}>
        <p>A IT</p>
      </div>
      <div>
        <p>10000/주</p>
      </div>
      <div className={styles.upDown}>
        <p className={styles.upDownPercent}>-30%</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.buyButtons}>매수</button>
        <hr />
        <button className={styles.sellButtons}>매도</button>
      </div>
    </div>
  )
}
