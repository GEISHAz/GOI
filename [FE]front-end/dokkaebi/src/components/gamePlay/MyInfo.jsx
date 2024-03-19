import React from 'react'
import styles from './MyInfo.module.css'
import { useRef } from 'react';

export default function MyInfo(props) {
  const myStockBackground = useRef();

  return (
    <div
    className={styles.background}
      ref={myStockBackground}
      onClick={(e) => {
        if (e.target === myStockBackground.current) {
          props.setMyInfoModal(false);
        }
      }}
    >
      <div className={styles.container}>
        zz
      </div>
    </div>
  )
}
