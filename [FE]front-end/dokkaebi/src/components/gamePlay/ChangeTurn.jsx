import React, { useRef } from 'react'
import styles from "./ChangeTurn.module.css";

export default function changeTurn({setChangeTurnModal, year}) {
  const modalBackGround = useRef();
  return (
    <div
    className={styles.background}
    ref={modalBackGround}
    onClick={(e) => {
      if (e.target === modalBackGround.current) {
        setChangeTurnModal(false);}}}>
      <div className={styles.container}>
        <p>{year}년 시작</p>
      </div>
    </div>
  )
}
