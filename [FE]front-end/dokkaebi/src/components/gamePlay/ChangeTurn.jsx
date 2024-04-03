import React, { useEffect, useRef } from 'react'
import styles from "./ChangeTurn.module.css";

export default function ChangeTurn({setChangeTurnModal, year}) {
  const modalBackGround = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      setChangeTurnModal(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div
    className={styles.background}
    ref={modalBackGround}
    onClick={(e) => {
      if (e.target === modalBackGround.current) {
        setChangeTurnModal(false);}}}>
      <div className={styles.container}>
        <p className={styles.text}>{year === 0 ? "게임 시작!" : `${year}년도 시작!`}</p>
      </div>
    </div>
  )
}