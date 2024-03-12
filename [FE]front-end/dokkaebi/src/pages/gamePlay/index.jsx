import Background from '../../images/gamePlay/background6.gif';
import styles from './index.module.css'
import Players from '../../components/gamePlay/Players';
import Timer from '../../components/gamePlay/Timer'
import Chat from '../../components/gamePlay/Chat'

export default function GamePlay() {

  return (
    <div className={styles.views}>
      <img src={Background} alt="배경 이미지" className={styles.background}/>
      <div className={styles.player1}><Players /></div>
      <div className={styles.player2}><Players /></div>
      <div className={styles.player3}><Players /></div>
      <div className={styles.player4}><Players /></div>
      <div className={styles.menubar}>
        <button className={styles.infoStore}>정보거래소</button>
        <div className={styles.timerAndTurn}>
          <Timer />
          <p className={styles.turn}>2011</p>
        </div>
        <button className={styles.readyButton}>READY</button>
      </div>
      <div className={styles.chat}>
        <Chat />
      </div>
    </div>
  );
}