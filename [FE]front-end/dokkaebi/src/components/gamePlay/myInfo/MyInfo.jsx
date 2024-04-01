import React from "react";
import styles from "./MyInfo.module.css";
import { useRef } from "react";
import MyInfoList from "./MyInfoList";

export default function MyInfo({setMyInfoModal, myInfoList}) {
  const myStockBackground = useRef();
  return (
    <div
      className={styles.background}
      ref={myStockBackground}
      onClick={(e) => {
        if (e.target === myStockBackground.current) {
          setMyInfoModal(false);
        }
      }}
    >
      <div className={styles.container}>
        <h1 className={styles.title}>구매 정보 내역</h1>
        <div className={styles.myInfoListArea}>
          { (Array.isArray(myInfoList) ? myInfoList : []).map((info, index) => (
            <MyInfoList key={index} info={info} />
          ))}
        </div>
      </div>
    </div>
  );
}
