import Background from "../../images/gamePlay/background6.gif";
import styles from "./index.module.css";
import Players from "../../components/gamePlay/user/Players";
import Timer from "../../components/gamePlay/Timer";
import Chat from "../../components/gamePlay/chat/Chat";
import Investment from "../../components/gamePlay/mainStock/Investment";
import InfoStore from "../../components/gamePlay/infoStore/InfoStore";
import MyStock from "../../components/gamePlay/myStock/MyStock";
import MyInfo from "../../components/gamePlay/myInfo/MyInfo";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function GamePlay() {
  const dispatch = useDispatch();
  const ready = useSelector((state) => state.game.ready);
  const money = useSelector((state) => state.game.money);
  const point = useSelector((state) => state.game.point);
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);

  const [stompClient, setStompClient] = useState(null);
  const socketUrl = "https://localhost:8080/ws-stomp";

  useEffect(() => {
    let reconnectInterval;

    const connect = () => {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(() => socket);
      setStompClient(stompClient);

      stompClient.connect(
        {},
        function (frame) {
          stompClient.subscribe("/sub/room/cheat/1", function (message) {
            const receivedMessage = JSON.parse(message.body);

            if (receivedMessage.type === "STOCK_MARKET") {
              console.log(receivedMessage.data);
            } else if (receivedMessage.type === "TIMER") {
              console.log(receivedMessage.data);
            }
          });
        },
        function (error) {
          // 연결이 끊어졌을 때 재연결을 시도합니다.
          console.log("STOMP: Connection lost. Attempting to reconnect", error);
          reconnectInterval = setTimeout(connect, 5000); // 5초 후 재연결 시도
        }
      );
    };

    connect();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // console.log(accessToken);
    axios
      .get(`https://j10d202.p.ssafy.io/api/game/start?id=1111`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data); // API 응답 데이터를 출력하거나 처리합니다.
      })
      .catch((error) => {
        console.error("API 요청에 실패했습니다:", error); // 오류를 콘솔에 출력하거나 처리합니다.
      });
  }, []);

  const openInfoStoreModal = () => {
    setInfoStoreModalOpen(true);
  };

  const openMyStockModal = () => {
    setMyStockModal(true);
  };

  const openMyInfoModal = () => {
    setMyInfoModal(true);
  };

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

      {myInfoModal && <MyInfo setMyInfoModal={setMyInfoModal} />}
    </div>
  );
}
