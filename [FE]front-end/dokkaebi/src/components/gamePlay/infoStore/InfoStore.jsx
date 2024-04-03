// import React from 'react'
import { useRef } from "react";
import InfoLIst from "./InfoList";
import styles from "./InfoStore.module.css";

export default function InfoStore({ setInfoStoreModalOpen, stockInfo, myPoint, setMyPoint }) {
  const modalBackGround = useRef();

  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setInfoStoreModalOpen(false);
        }
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>정보 거래소</h1>
        <p>MY POINT : {myPoint}</p>
        <div className={styles.infoSelector}>
          <InfoLIst company={stockInfo[0].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[1].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[2].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[3].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[4].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[5].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[6].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[7].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
          <InfoLIst company={stockInfo[8].item} myPoint={myPoint} setMyPoint={setMyPoint}/>
        </div>
      </div>
    </div>
  );
}
