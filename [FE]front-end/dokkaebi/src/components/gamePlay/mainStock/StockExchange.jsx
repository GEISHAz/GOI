import React, { useEffect, useRef, useState } from "react";
import styles from "./StockExchange.module.css";
import chart from "../../../images/gamePlay/StockChart.jpg";
import ChartComponent from "./ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function StockExchange(props) {
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");
  const dispatch = useDispatch();
  const [myStock, setMyStock] = useState(0);
  const [myCash, setMyCash] = useState(0);
  const [quantity, setQuantity] = useState(0); // 매수 또는 매도할 주 수 상태
  const [myStocks, setMyStocks] = useState(0); // 보유 주 수 상태
  const [cash, setCash] = useState(0); // 보유 현금 상태
  const [currentCost, setCurrentCost] = useState(0); // 현재 주가 상태
  const stockExchangeBackground = useRef();
  const onErrorChartImg = (e) => {
    e.target.src = chart;
  };

  useEffect(() => {
    axios
      .get(`https://j10d202.p.ssafy.io/api/stock/${props.item}/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log("내 주식 가져오기 성공");
        setMyStock(response.data.shares);
        setMyStocks(response.data.shares);
        setMyCash(response.data.remainVal);
        setCash(response.data.remainVal);
        setCurrentCost(response.data.curCost);
      })
      .catch((error) => {
        // console.log(error);
        // console.log("내 주식 가져오기 실패");
      });
  }, []);

  // 매수 또는 매도 버튼 클릭 시 실행되는 함수
  const handleTransaction = () => {
    // dispatch(setMoney(cash))
    if (props.transactionType === "buy") {
      // console.log("매수할 주 수:", quantity);
      axios
        .put(
          `https://j10d202.p.ssafy.io/api/stock/buy`,
          { grId: roomId, item: props.item, share: quantity },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          // console.log("주식 구매 성공");
          // console.log(quantity);
        })
        .catch((error) => {
          // console.log(error);
          // console.log("주식 구매 실패");
        });
    } else if (props.transactionType === "sell") {
      axios
        .put(
          `https://j10d202.p.ssafy.io/api/stock/sell`,
          { grId: roomId, item: props.item, share: quantity },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          // console.log(quantity);
          // console.log("주식 판매 성공");
        })
        .catch((error) => {
          // console.log(error);
          // console.log("주식 판매 실패");
        });
    }

    // 모달 닫기
    props.setStockExchangeModal(false);
    props.setMyStocksDetailModal(false);
    // if
  };

  // 입력란에 숫자가 변경될 때마다 상태 업데이트
  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value);
    setQuantity(inputQuantity >= 0 ? inputQuantity : 0);
    if (props.transactionType === "buy") {
      // 매수 로직
      // console.log("매수할 주 수:", inputQuantity);
      setMyStocks(parseInt(myStock) + inputQuantity);
      setCash(myCash - currentCost * inputQuantity);
      // console.log(myStock)
    } else if (props.transactionType === "sell") {
      // 매도 로직
      // console.log("매도할 주 수:", inputQuantity);
      setMyStocks(parseInt(myStock) - inputQuantity);
      setCash(myCash + currentCost * inputQuantity);
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
          props.setMyStocksDetailModal(false);
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
          <h1 className={styles.companyName}>{props.item}</h1>
          {/* 주식차트 예시 */}
          <div className={styles.chartArea}>
            <ChartComponent item={props.item} />
          </div>
          {/* <img
            src=""
            alt="chart"
            onError={onErrorChartImg}
            className={styles.chartImg}
          /> */}
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
              <p>
                {currentCost?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
          </div>
          <div className={styles.displayInfo}>
            <p className={styles.boldText}>보유 현금</p>
            <div className={styles.text}>
              <p>{myCash?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <span>▶</span>
              <p>{cash?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            </div>
          </div>
          <div className={styles.buyAndSellButton}>
            <div className={styles.inputSelectorArea}>
              <input
                type="number"
                min="0"
                className={styles.inputNumber}
                placeholder={`매${
                  props.transactionType === "buy" ? "수" : "도"
                }할 주 수를 입력해주세요`}
                value={quantity}
                onChange={handleQuantityChange}
              />
              <div className={styles.ju}>
                <p>주</p>
              </div>
            </div>
            <button
              className={
                props.transactionType === "buy"
                  ? styles.maesuButton
                  : styles.maedoButton
              }
              onClick={handleTransaction}
              disabled={
                (props.transactionType === "buy" &&
                  currentCost * quantity > myCash) ||
                (props.transactionType === "sell" &&
                  (quantity > myStock || myStocks < 0))
              }
              style={{
                opacity:
                  (props.transactionType === "buy" &&
                    currentCost * quantity > myCash) ||
                  (props.transactionType === "sell" &&
                    (quantity > myStock || myStocks < 0))
                    ? 0.5
                    : 1,
              }}
            >
              {props.transactionType === "buy" ? "매수" : "매도"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
