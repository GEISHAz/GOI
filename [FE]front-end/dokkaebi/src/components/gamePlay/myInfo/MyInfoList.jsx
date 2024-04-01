import React from "react";
import styles from "./MyInfoList.module.css";

export default function MyInfoList({info}) {
  return (
    <div className={styles.myInfoListBackground}>
      <div className={styles.infoListTitleArea}>
        <h1>{info.item}</h1>
        <p>{info.year}</p>
      </div>
      <div className={styles.infoListMainArea}>
        <p>
          {info.content}
        </p>
      </div>
    </div>
  );
}
