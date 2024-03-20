// import React from 'react'
import { useRef } from 'react'
import InfoLIst from './InfoList'
import styles from './InfoStore.module.css'

export default function InfoStore(props) {
  const modalBackGround = useRef();

  return (
    <div className={styles.background}
    ref={modalBackGround}
    onClick={(e)=>{
      if (e.target === modalBackGround.current) {
        props.setInfoStoreModalOpen(false);
      }
    }}>
      <div className={styles.container}>
        <h1 className={styles.title}>정보 거래소</h1>
        <div className={styles.infoSelector}>
          <InfoLIst company="A IT" />
          <InfoLIst company="B 화학" />
          <InfoLIst company="C 식품" />
          <InfoLIst company="D 바이오" />
          <InfoLIst company="E 자동차" />
          <InfoLIst company="F 항공" />
          <InfoLIst company="G 뷰티" />
          <InfoLIst company="H 엔터" />
          <InfoLIst company="I 통신" />
        </div>
      </div>
    </div>
  )
}
