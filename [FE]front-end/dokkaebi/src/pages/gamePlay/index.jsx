import Background from "../../images/gamePlay/background6.gif";
import styles from "./index.module.css";
import Players from "../../components/gamePlay/user/Players";
import Timer from "../../components/gamePlay/Timer";
import Chat from "../../components/gamePlay/chat/Chat";
import Investment from "../../components/gamePlay/mainStock/Investment";
import InfoStore from "../../components/gamePlay/infoStore/InfoStore";
import MyStock from "../../components/gamePlay/myStock/MyStock";
import MyInfo from "../../components/gamePlay/myInfo/MyInfo";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

export default function GamePlay() {
  const dispatch = useDispatch();
  const ready = useSelector((state) => state.game.ready)
  const money = useSelector((state) => state.game.money)
  const point = useSelector((state) => state.game.point)
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);

  const openInfoStoreModal = () => {
    setInfoStoreModalOpen(true);
  };

  const openMyStockModal = () => {
    setMyStockModal(true);
  };

  const openMyInfoModal = () => {
    setMyInfoModal(true);
  }

  return (
    <div className={styles.views}>
      <img src={Background} alt="배경 이미지" className={styles.background} />
      <div className={styles.player1}>
        <Players />
      </div>
      {/* 내 정보 */}
      <div className={styles.player2}>
        <Players />
      </div>
      <div className={styles.player3}>
        <Players />
      </div>
      <div className={styles.player4}>
        <Players />
      </div>
      <div className={styles.menubar}>
        <button className={styles.infoStore} onClick={openInfoStoreModal}>
          정보거래소
        </button>
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
        <button onClick={openMyInfoModal}>구매 정보 확인</button>
      </div>

      {infoStoreModalOpen && (
        <InfoStore setInfoStoreModalOpen={setInfoStoreModalOpen} />
      )}

      {myStockModal && <MyStock setMyStockModal={setMyStockModal} />}

      {myInfoModal && <MyInfo setMyInfoModal={setMyInfoModal}/>}
    </div>
  );
}
