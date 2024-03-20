// import React from 'react'
import { useState } from 'react'
import styles from './InfoList.module.css'
import InfoStoreDetail from './InfoStoreDetail'

export default function InfoLIst(props) {
  const company = props.company
  const [infoStoreDetailModalOpen, setInfoStoreDetailModalOpen] = useState(false)
  const openInfoStoreDetailModal = () => {
    setInfoStoreDetailModalOpen(true)
  }
  const info = '가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하'

  return (
    <div className={styles.background}>
      <div className={styles.companyArea}>
        <p>{props.company}</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.levelOneButtons} onClick={openInfoStoreDetailModal}>1단계</button>
        <hr />
        <button className={styles.levelTwoButtons} onClick={openInfoStoreDetailModal}>2단계</button>
      </div>
      {infoStoreDetailModalOpen && <InfoStoreDetail setInfoStoreDetailModalOpen={setInfoStoreDetailModalOpen} company={company} info={info}/>}
    </div>
  )
}