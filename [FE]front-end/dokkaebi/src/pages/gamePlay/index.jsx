import Background from "../../images/gamePlay/background6.gif";
import styles from "./index.module.css";
import Players from "../../components/gamePlay/user/Players";
// import Timer from "../../components/gamePlay/Timer";
import Chat from "../../components/gamePlay/chat/Chat";
import Investment from "../../components/gamePlay/mainStock/Investment";
import InfoStore from "../../components/gamePlay/infoStore/InfoStore";
import MyStock from "../../components/gamePlay/myStock/MyStock";
import MyInfo from "../../components/gamePlay/myInfo/MyInfo";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function GamePlay() {
  // const dispatch = useDispatch();
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

  const stompClientRef = useRef(null);
  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";

  const isManager = sessionStorage.getItem("isManager");
  const [userList, setUserList] = useState([]);
  const [userReadyList, setUserReadyList] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [otherUsers, setOtherUsers] = useState([]);
  const [myReady, setMyReady] = useState([]);
  const [ready, setReady] = useState(false);
  const [otherUsersReady, setOtherUsersReady] = useState([]);

  const [stockInfo, setStockInfo] = useState([]);
  const [myInfoList, setMyInfoList] = useState([]);

  const [timerMin, setTimerMin] = useState("3");
  const [timerSec, setTimerSec] = useState("00");
  const [timerMSec, setTimerMSec] = useState(100);
  const [year, setYear] = useState(0);

  useEffect(() => {
    setReady(false);
  }, [year]);

  useEffect(() => {
    console.log("유저 레디 정보", userReadyList);
    setMyReady(userReadyList.find((user) => user.userId == userId));
    console.log("내 레디 상태", myReady);
    setReady(myReady ? myReady.isReady : false);
    setOtherUsersReady(userReadyList.filter((user) => user.userId != userId));
    console.log("나머지 유저 레디 상태", otherUsersReady);
  }, [userReadyList]);

  useEffect(() => {
    console.log("유저 정보", userList);
    setCurrentUser(userList.find((user) => user.userId == userId));
    console.log("현재 유저 정보", currentUser);
    setOtherUsers(userList.filter((user) => user.userId != userId));
    console.log("나머지 유저 정보", otherUsers);
  }, [userList]);

  useEffect(() => {
    if (timerMSec === 0 && isManager === "true") {
      axios
        .get(`https://j10d202.p.ssafy.io/api/game/next?id=${roomId}`, {
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
    }
  }, [timerMSec]);

  useEffect(() => {
    const initialize = async () => {
      await stompConnect();
      // await gameStart();
      setTimeout(() => {
        gameStart();
      }, 300);
    };
    initialize();
  }, []);

  const gameStart = () => {
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
          console.error("요청에 실패했습니다:", error);
        });
    }
  };

  const onClickReady = () => {
    console.log("레디 버튼 클릭 방 번호 : ", roomId);
    axios
      .put(
        `https://j10d202.p.ssafy.io/api/game/ready/${roomId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        // setReady(!ready);
      })
      .catch((error) => {
        console.error("API 요청에 실패했습니다:", error);
      });
  };

  const getMyInfoList = () => {
    axios
      .get(`https://j10d202.p.ssafy.io/api/stock/infolist?id=${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("구매 정보 내역", response);
        setMyInfoList(response.data);
      })
      .catch((error) => {
        console.error("구매 정보 확인 정보 요청에 실패했습니다:", error);
      });
  };

  const stompConnect = () => {
    let reconnectInterval;
    const connect = () => {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(() => socket);
      stompClientRef.current = stompClient;

      stompClient.connect(
        {
          Authorization: `Bearer ${accessToken}`,
        },
        function (frame) {
          stompClient.subscribe(`/sub/room/chat/${roomId}`, function (message) {
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage);

            if (receivedMessage.type === "STOCK_MARKET") {
              console.log("주식 정보??????????????????????", receivedMessage);
              setYear(receivedMessage.data.year);
              setStockInfo(receivedMessage.data.stockInfo);
              setUserList(receivedMessage.data.participants);
              console.log("유저 정보", receivedMessage.data.participants);
            } else if (receivedMessage.type === "TIMER") {
              console.log(receivedMessage.type);
              // console.log(receivedMessage.data.remainingMin);
              // console.log(receivedMessage.data.remainingSec);
              setTimerMin(receivedMessage.data.remainingMin);
              setTimerSec(receivedMessage.data.remainingSec);
              setTimerMSec(receivedMessage.data.remainingTime);
            } else if (receivedMessage.type === "READY") {
              console.log("레디 정보??????????????????", receivedMessage.data);
              setUserReadyList(receivedMessage.data.list);
            } else if (receivedMessage.type === "GAME_RESULT") {
              console.log("결과 정보", receivedMessage.data.winner);
            }
          });
        },
        function (error) {
          // 연결이 끊어졌을 때 재연결을 시도합니다.
          console.log("STOMP: Connection lost. Attempting to reconnect", error);
          reconnectInterval = setTimeout(connect, 3000); // 초 후 재연결 시도
        }
      );
    };
    connect();

    return () => {
      console.log("unmounting...");

      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  };

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
          <Players
            user={currentUser ? currentUser : null}
            userReady={myReady}
          />
        </div>

        {/* 나머지 유저들의 정보를 전달합니다. */}
        <div className={styles.player2}>
          <Players
            user={otherUsers[0] ? otherUsers[0] : null}
            userReady={otherUsersReady[0] ? otherUsersReady[0] : null}
          />
        </div>
        <div className={styles.player3}>
          <Players
            user={otherUsers[1] ? otherUsers[1] : null}
            userReady={otherUsersReady[1] ? otherUsersReady[1] : null}
          />
        </div>
        <div className={styles.player4}>
          <Players
            user={otherUsers[2] ? otherUsers[2] : null}
            userReady={otherUsersReady[2] ? otherUsersReady[2] : null}
          />
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
          <p className={styles.turn}>{year}년</p>
        </div>
        <button className={styles.readyButton} onClick={onClickReady}>
          {ready ? "CANCEL" : "READY"}
        </button>
      </div>
      <div className={styles.chat}>
        <Chat />
      </div>
      <div className={styles.investment}>
        <Investment stockInfo={stockInfo} />
      </div>
      <div className={styles.myMenu}>
        <button onClick={openMyStockModal}>내 주식 확인</button>
        <button
          onClick={() => {
            openMyInfoModal();
            getMyInfoList();
          }}
        >
          구매 정보 확인
        </button>
      </div>

      {infoStoreModalOpen && (
        <InfoStore
          setInfoStoreModalOpen={setInfoStoreModalOpen}
          stockInfo={stockInfo}
        />
      )}

      {myStockModal && <MyStock setMyStockModal={setMyStockModal} />}

      {myInfoModal && <MyInfo setMyInfoModal={setMyInfoModal} myInfoList={myInfoList} />}
    </div>
  );
}

// GamePlay.__isStatic = true;
