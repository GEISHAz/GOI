import Background from '../../images/gamePlay/background6.gif';
import styles from './index.module.css'
import Players from '../../components/gamePlay/Players';
import Timer from '../../components/gamePlay/Timer'
import Chat from '../../components/gamePlay/Chat'
import Investment from '../../components/gamePlay/Investment';
import InfoStore from '../../components/gamePlay/InfoStore'
import { useState } from 'react';

export default function GamePlay() {
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false)

  const openInfoStoreModal = () => {
    setInfoStoreModalOpen(true)
  }

  const openMyStockModal = () => {
    setMyStockModal(true)
  }


  return (
    <div className={styles.views}>
      <img src={Background} alt="배경 이미지" className={styles.background}/>
      <div className={styles.player1}><Players /></div>
      <div className={styles.player2}><Players /></div>
      <div className={styles.player3}><Players /></div>
      <div className={styles.player4}><Players /></div>
      <div className={styles.menubar}>
        <button className={styles.infoStore} onClick={openInfoStoreModal}>정보거래소</button>
        <div className={styles.timerAndTurn}>
          <Timer />
          <p className={styles.turn}>1턴</p>
        </div>
        <button className={styles.readyButton}>READY</button>
      </div>
      <div className={styles.chat}>
        <Chat />
      </div>
      <div className={styles.investment}>
        <Investment />
      </div>
      <div className={styles.myMenu}>
        <button onClick={openMyStockModal}>내 주식 확인</button>
        <button>구매 정보 확인</button>
      </div>
      {/* <div className={styles.infoStoreModal}> */}
      {infoStoreModalOpen && <InfoStore setInfoStoreModalOpen={setInfoStoreModalOpen}/>}
      {myStockModal && <InfoStore setMyStockModal={setMyStockModal}/>}
      {/* </div> */}
    </div>
  );
}