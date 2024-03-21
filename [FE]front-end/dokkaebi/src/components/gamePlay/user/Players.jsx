// import React from 'react'
import styles from './Players.module.css'
import profile from '../../../images/gamePlay/bat_slower.gif'

export default function Players() {
  const onErrorProfileImg = (e) => {
    e.target.src = profile
  }

  return (
    <div className={styles.playerComponents}>
      <img src='' alt='profile' onError={onErrorProfileImg}></img>
      <div className={styles.playerInfo}>
        <div className={styles.player}>
          <p className={styles.playerNickName}>이름</p>
          <p className={styles.playerReady}>READY</p>
        </div>
        <p className={styles.playerTotalMoney}>500000000000</p>
      </div>
    </div>
  )
}
