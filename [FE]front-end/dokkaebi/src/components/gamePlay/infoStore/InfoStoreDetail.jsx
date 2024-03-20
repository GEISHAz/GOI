// import React from 'react'
import styles from './InfoStoreDetail.module.css'

import { useRef } from 'react';

export default function InfoStoreDetail(props) {
  const infoDetailmodalBackGround = useRef();

  return (
    <div className={styles.background}
    ref={infoDetailmodalBackGround}
    onClick={(e)=>{
      if (e.target === infoDetailmodalBackGround.current) {
        props.setInfoStoreDetailModalOpen(false);
      }
    }}
    // 뷰포트 기준으로 위치 조정 (module.css에서는 적용 x)
    style={{position:'fixed', top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}
    >
      <div className={styles.container}>
        <h1 className={styles.infoHTag}>{props.company}</h1>
        <p className={styles.infoPTag}>{props.info}</p>
      </div>
    </div>
  )
}

