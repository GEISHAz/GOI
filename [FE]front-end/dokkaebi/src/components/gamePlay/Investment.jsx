// import React from 'react'
import styles from './Investment.module.css'
import InvestmentInfo from './InvestmentInfo'

export default function Investment() {
  return (
    <div className={styles.container}>
      <div className={styles.listName}>
        <p>회사</p>
        <p>주가</p>
        <p>등락폭</p>
        <p>매수/매도</p>
      </div>
      <div>
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
       <InvestmentInfo />
      </div>
    </div>
  )
}
