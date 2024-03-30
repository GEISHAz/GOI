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
import { useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function GamePlay() {
  const dispatch = useDispatch();
  // let location = useLocation();

  // const [response, setResponse] = useState(
  //   location.state ? location.state.response.data : null
  // );
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const roomId = sessionStorage.getItem("roomId");
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);

  const [stompClient, setStompClient] = useState(null);
  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";

  const isManager = sessionStorage.getItem("isManager");
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [otherUsers, setOtherUsers] = useState([]);

  const [timerMin, setTimerMin] = useState(0);
  const [timerSec, setTimerSec] = useState(0);
  const [timerMSec, setTimerMSec] = useState(0);
  const [turn, setTurn] = useState(0);

  // useEffect(() => {
  //   console.log("준비 방에서 받아온 유저 리스트", response);
  //   if (response.userList) {
  //     setUserList(response.userList);
  //   } else {
  //     setUserList(response);
  //   }
  // }, [response]);

  useEffect(() => {
    setCurrentUser(userList.find((user) => user.userId === userId));
    setOtherUsers(userList.filter((user) => user.userId !== userId));
  }, [userList]);

  useEffect(() => {

  },[timerMSec])

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
              console.log("주식정보", receivedMessage);
            } else if (receivedMessage.type === "TIMER") {
              console.log(receivedMessage.data.remainingMin);
              console.log(receivedMessage.data.remainingSec);
              setTimerMin(receivedMessage.data.remainingMin);
              setTimerSec(receivedMessage.data.remainingSec);
              setTimerMSec(receivedMessage.data.remainingTime)
            } else if (receivedMessage.type === "READY") {
              console.log(receivedMessage.data.ready);
            } else if (receivedMessage.type === "GAME_RESULT") {
              console.log(receivedMessage.data.winner);
            }
          });
        },
        function (error) {
          // 연결이 끊어졌을 때 재연결을 시도합니다.
          console.log("STOMP: Connection lost. Attempting to reconnect", error);
          reconnectInterval = setTimeout(connect, 2000); // 초 후 재연결 시도
        }
      );
    };

    connect();

    // stompClient.current.send(
    //   `/pub/room/list`,
    //   {roomId: roomId},
    //   JSON.stringify("리스트 요청")
    // );
    // console.log("리스트 요청 보냄");

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, []);

  useEffect(() => {
    console.log("게임 시작 요청 보냄");

    if (isManager === "true") {
      console.log("방장이므로 게임 시작 요청을 보냅니다.");
      axios
        .get(`https://j10d202.p.ssafy.io/api/game/start?id=${roomId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("API 요청에 실패했습니다:", error);
        });
        return () => {
          console.log("unmounting...");
        };
    }
  }, [isManager]);

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
      <div className={styles.views}>
        {/* 현재 유저의 정보를 전달합니다. */}
        <div className={styles.player1}>
          <Players user={currentUser ? currentUser : null} />
        </div>

        {/* 나머지 유저들의 정보를 전달합니다. */}
        <div className={styles.player2}>
          <Players user={otherUsers[0] ? otherUsers[0] : null} />
        </div>
        <div className={styles.player3}>
          <Players user={otherUsers[1] ? otherUsers[1] : null} />
        </div>
        <div className={styles.player4}>
          <Players user={otherUsers[2] ? otherUsers[2] : null} />
        </div>
      </div>
      <div className={styles.menubar}>
        <button className={styles.infoStore} onClick={openInfoStoreModal}>
          정보거래소
        </button>
        <div className={styles.timerAndTurn}>
          {/* <Timer /> */}
          <p className={styles.timer}>
            {timerMin}:{timerSec}
          </p>
          <p className={styles.turn}>{turn}턴</p>
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
