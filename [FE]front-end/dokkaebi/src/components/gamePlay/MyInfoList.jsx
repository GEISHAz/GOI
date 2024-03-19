import React from "react";
import styles from "./MyInfoList.module.css";

export default function MyInfoList() {
  return (
    <div className={styles.myInfoListBackground}>
      <div className={styles.infoListTitleArea}>
        <h1>A 바이오</h1>
        <p>1턴</p>
      </div>
      <div className={styles.infoListMainArea}>
        <p>
          가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하
        </p>
      </div>
    </div>
  );
}
