import React, { useRef, useState } from "react";
import styles from "./StockExchange.module.css";
import chart from '../../../images/gamePlay/StockChart.jpg'
import { useDispatch, useSelector } from 'react-redux';


export default function StockExchange(props) {
  const dispatch = useDispatch();
  const myStock = props.myStock
  const myCash = useSelector((state) => state.game.money);
  const [quantity, setQuantity] = useState(0); // 매수 또는 매도할 주 수 상태
  const [myStocks, setMyStocks] = useState(0); // 보유 주 수 상태
  const [cash, setCash] = useState(myCash); // 보유 현금 상태
  const stockExchangeBackground = useRef();
  const onErrorChartImg = (e) => {
    e.target.src = chart;
  };

  // 매수 또는 매도 버튼 클릭 시 실행되는 함수
  const handleTransaction = () => {
    dispatch(setMoney(cash))
    // 모달 닫기
    props.setStockExchangeModal(false);
  };

  // 입력란에 숫자가 변경될 때마다 상태 업데이트
  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value);
    setQuantity(inputQuantity >= 0 ? inputQuantity : 0);
    if (props.transactionType === "buy") {
      // 매수 로직
      // console.log("매수할 주 수:", inputQuantity);
      setMyStocks(parseInt(myStock) + inputQuantity);
      setCash(myCash - (props.price * inputQuantity));
      // console.log(myStock)
    } else if (props.transactionType === "sell") {
      // 매도 로직
      // console.log("매도할 주 수:", inputQuantity);
      setMyStocks(parseInt(myStock) - inputQuantity);
      setCash(myCash + (props.price * inputQuantity));
      // console.log(myStock)
    }
  };

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
          <img
            src=""
            alt="chart"
            onError={onErrorChartImg}
            className={styles.chartImg}
          />
        </div>
        <div className={styles.myStockInfo}>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>보유주</p>
            <div className={styles.text}>
              <p>{myStock}</p>
              <span>▶</span>
              <p>{myStocks}</p>
            </div>
          </div>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>주당 가격</p>
            <div className={styles.text}>
              <p>{props.price}</p>
            </div>
          </div>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>보유 현금</p>
            <div className={styles.text}>
              <p>{myCash}</p>
              <span>▶</span>
              <p>{cash}</p>
            </div>
          </div>
          <div className={styles.buyAndSellButton}>
            <div className={styles.inputSelectorArea}>
              <input
                type="number"
                min="0"
                className={styles.inputNumber}
                placeholder={`매${props.transactionType === "buy" ? "수" : "도"}할 주 수를 입력해주세요`}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <div className={styles.ju}>
                <p>주</p>
              </div>
            </div>
            <button
              className={props.transactionType === "buy" ? styles.maesuButton : styles.maedoButton}
              onClick={handleTransaction}
              disabled={
                (props.transactionType === "buy" && props.price * quantity > myCash) ||
                (props.transactionType === "sell" && (quantity > myStocks || myStocks === 0))
              }
              style={{ opacity: (props.transactionType === "buy" && props.price * quantity > myCash) || (props.transactionType === "sell" && (quantity > myStocks || myStocks === 0)) ? 0.5 : 1 }}
            >
              {props.transactionType === "buy" ? "매수" : "매도"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
