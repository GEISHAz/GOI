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
  const userNickname = useSelector((state) => state.auth.userNickname);
  const accessToken = sessionStorage.getItem("accessToken");
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);

  const [stompClient, setStompClient] = useState(null);
  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";
  const roomId = sessionStorage.getItem("roomId");

  const [timerMin, setTimerMin] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [turn, setTurn] = useState(0);


  useEffect(() => {
    let reconnectInterval;

    const connect = () => {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(() => socket);
      setStompClient(stompClient);

      stompClient.connect(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        function (frame) {
          stompClient.subscribe(`/sub/room/chat/${roomId}`, function (message) {
            const receivedMessage = JSON.parse(message.body);
            console.log(receivedMessage);

            if (receivedMessage.type === "STOCK_MARKET") {
              console.log(receivedMessage);
            } else if (receivedMessage.type === "TIMER") {
              console.log(receivedMessage.data.remainingTime);
            } else if (receivedMessage.type === "TURN") {
              console.log(receivedMessage.data.turn);
            } else if (receivedMessage.type === "READY") {
              console.log(receivedMessage.data.ready);
            } else if (receivedMessage.type === "GAME_OVER") {
              console.log(receivedMessage.data.winner);
            }
          });
        },
        function (error) {
          // 연결이 끊어졌을 때 재연결을 시도합니다.
          console.log("STOMP: Connection lost. Attempting to reconnect", error);
          reconnectInterval = setTimeout(connect, 2000); // 5초 후 재연결 시도
        }
      );

    };

    connect();

    stompClient.current.send(
      `/pub/room/list`,
      {roomId: roomId},
      JSON.stringify("리스트 요청")
    );
    console.log("리스트 요청 보냄");

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, []);



  // const accessToken = sessionStorage.getItem("accessToken");

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
    return () => {
      // console.log("unmounting...");
    };
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
