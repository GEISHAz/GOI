import Background from "../../images/gamePlay/background6.gif";
import styles from "./index.module.css";
import Players from "../../components/gamePlay/user/Players";
// import Timer from "../../components/gamePlay/Timer";
import Chat from "../../components/gamePlay/chat/Chat";
import Investment from "../../components/gamePlay/mainStock/Investment";
import InfoStore from "../../components/gamePlay/infoStore/InfoStore";
import MyStock from "../../components/gamePlay/myStock/MyStock";
import MyInfo from "../../components/gamePlay/myInfo/MyInfo";
import Result from "../../components/gamePlay/Result";
import ChangeTurn from "../../components/gamePlay/ChangeTurn";
import LastTurnStockInfo from "../../components/gamePlay/LastTurnStockInfo";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function GamePlay() {
  // const dispatch = useDispatch();
  // let location = useLocation();

  // const [response, setResponse] = useState(
  //   location.state ? location.state.response.data : null
  // );

  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = Number(sessionStorage.getItem("userId"));
  const roomId = sessionStorage.getItem("roomId");
  const channelId = sessionStorage.getItem("channelId");
  // const [modalOpen, setModalOpen] = useState(false);
  const [infoStoreModalOpen, setInfoStoreModalOpen] = useState(false);
  const [myStockModal, setMyStockModal] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [changeTurnModal, setChangeTurnModal] = useState(false);
  const [lastTurnStockModal, setLastTurnStockModal] = useState(false);

  const stompClientRef = useRef(null); // 구독하는 사람
  const gameStompRef = useRef(null); // 구독 식별자 번호
  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";

  const isManager = sessionStorage.getItem("isManager");
  const [userList, setUserList] = useState([]);
  const [userReadyList, setUserReadyList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [myReady, setMyReady] = useState(false);
  const [ohMyReady, setOhMyReady] = useState(false);
  const [myPoint, setMyPoint] = useState(0);
  const [otherUsersReady, setOtherUsersReady] = useState([]);

  const [stockInfo, setStockInfo] = useState([]);
  const [myInfoList, setMyInfoList] = useState([]);
  const [userNicks, setUserNicks] = useState([]);
  const [timerMin, setTimerMin] = useState("3");
  const [timerSec, setTimerSec] = useState("00");
  const [timerMSec, setTimerMSec] = useState(100);
  const [remainTurn, setRemainTurn] = useState(99);
  const [year, setYear] = useState(0);

  const [result, setResult] = useState([]);

  const [lastTurnStock, setLastTurnStock] = useState([]);

  useEffect(() => {
    setOhMyReady(false);
    setChangeTurnModal(true);
  }, [year]);

  useEffect(() => {
    // console.log("ohMyReady 상태", ohMyReady);
    // console.log("유저 레디 정보1", userReadyList);
    setMyReady(userReadyList.find((user) => user.userId == userId));
    setOtherUsersReady(userReadyList.filter((user) => user.userId != userId));
    // console.log("나머지 유저 레디 상태", otherUsersReady);
  }, [userReadyList]);

  useEffect(() => {
    // console.log("유저 정보1", userList);
    setCurrentUser(userList.find((user) => user.userId == userId));
    // console.log("현재 유저 정보1", currentUser);
    // setReady(currentUser.isReady? currentUser.isReady : ready);
    // console.log("현재 유저 정보", currentUser);
    setOtherUsers(userList.filter((user) => user.userId != userId));
    // console.log("나머지 유저 정보", otherUsers);
  }, [userList]);

  useEffect(() => {
    setMyPoint(currentUser?.point);
  }, [currentUser]);

  useEffect(() => {
    if (timerMSec === 0 && isManager === "true") {
      // if (remainTurn === 0) {
      //   axios
      //     .put(
      //       `https://j10d202.p.ssafy.io/api/game/end/${roomId}`,
      //       {},
      //       {
      //         headers: {
      //           Authorization: `Bearer ${accessToken}`,
      //         },
      //       }
      //     )
      //     .then((response) => {
      //       console.log(response);
      //       setResultModal(true);
      //     })
      //     .catch((error) => {
      //       console.error("게임 종료 요청에 실패했습니다:", error);
      //     });
      // } else {
      axios
        .get(`https://j10d202.p.ssafy.io/api/game/next?id=${roomId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.error("턴넘기기 요청에 실패했습니다:", error);
        });
    }
    // }
  }, [timerMSec]);

  useEffect(() => {
    const initialize = async () => {
      // await stompConnect();
      // await gameStart();
      setTimeout(() => {
        gameStart();
      }, 500);
    };
    initialize();

    return () => {};
  }, []);

  const gameStart = () => {
    if (isManager === "true") {
      // console.log("방장이므로 게임 시작 요청을 보냅니다.");
      axios
        .get(`https://j10d202.p.ssafy.io/api/game/start?id=${roomId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.error("게임 시작요청에 실패했습니다:", error);
        });
    }
  };

  const playSound = () => {
    const sound = new Audio("/public/bgm/gameStart.mp3");
    sound.play();
  };

  const onClickReady = async () => {
    playSound();
    // console.log("레디 버튼 클릭 방 번호 : ", roomId);
    try {
      const response = await axios.put(
        `https://j10d202.p.ssafy.io/api/game/ready/${roomId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log("dkdk", response);
    } catch (error) {
      console.error("레디 요청에 실패했습니다:", error);
      if (error.response && error.response.data.statusCode === 410) {
        // 게임 종료 요청
        try {
          const response = await axios.put(
            `https://j10d202.p.ssafy.io/api/game/end/${roomId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          // console.log(response);
          setResultModal(true);
        } catch (error) {
          console.error("게임 종료 요청에 실패했습니다:", error);
        }
      }
    }
  };

  const getMyInfoList = () => {
    axios
      .get(`https://j10d202.p.ssafy.io/api/stock/infolist?id=${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log("구매 정보 내역", response);
        setMyInfoList(response.data);
      })
      .catch((error) => {
        console.error("구매 정보 확인 정보 요청에 실패했습니다:", error);
      });
  };

  const exitGame = () => {
    axios
      .delete(`https://j10d202.p.ssafy.io/api/game/exit/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        sessionStorage.removeItem("roomId");
        sessionStorage.removeItem("isManager");

        // console.log(
        //   "나갈 때 연결되어있는지 확인 :",
        //   stompClientRef.current.connected
        // );

        if (stompClientRef.current && stompClientRef.current.connected) {
          if (gameStompRef.current) {
            // console.log("게임을 나가서 구독을 끊을게요");
            gameStompRef.current.unsubscribe();
            gameStompRef.current = null;
          }

          // WebSocket 연결 끊기
          stompClientRef.current.disconnect(() => {
            // console.log("게임을 나가서 확실하게 연결을 끊을게요");
            navigate(`/square/${channelId}`);
          });
        } else {
          // console.log("Not connected to WebSocket server");
        }
      })
      .catch((error) => {
        console.error("나가기 요청에 실패했습니다:", error);
      });
  };

  useEffect(() => {
    let reconnectInterval;
    const socket = new SockJS(socketUrl);
    stompClientRef.current = Stomp.over(socket);

    gameStompRef.current = stompClientRef.current.connect(
      {
        Authorization: `Bearer ${accessToken}`,
      },
      () => {
        stompClientRef.current.subscribe(
          `/sub/room/chat/${roomId}`,
          function (message) {
            const receivedMessage = JSON.parse(message.body);
            // console.log(receivedMessage);

            if (receivedMessage.type === "STOCK_MARKET") {
              // console.log("주식 정보??????????????????????", receivedMessage);
              setYear(receivedMessage.data.year);
              setStockInfo(receivedMessage.data.stockInfo);
              setUserList(receivedMessage.data.participants);
              setRemainTurn(receivedMessage.data.remainTurn);
              // console.log("유저 정보", receivedMessage.data.participants);

              const nicks = receivedMessage.data.participants.map(
                (participant) => participant.userNick
              );
              setUserNicks(nicks);
            } else if (receivedMessage.type === "TIMER") {
              // console.log(receivedMessage.type);
              // console.log(receivedMessage.data.remainingMin);
              // console.log(receivedMessage.data.remainingSec);
              setTimerMin(receivedMessage.data.remainingMin);
              setTimerSec(receivedMessage.data.remainingSec);
              setTimerMSec(receivedMessage.data.remainingTime);
            } else if (receivedMessage.type === "READY") {
              // console.log("레디 정보??????????????????", receivedMessage.data);
              setUserReadyList(receivedMessage.data.list);
              if (receivedMessage.data.userId == userId) {
                setOhMyReady(receivedMessage.data.ready);
              }
            } else if (receivedMessage.type === "GAME_RESULT") {
              // console.log("결과 정보", receivedMessage.data);
              setResult(receivedMessage.data);
              setResultModal(true);
            } else if (receivedMessage.type === "ROOM_EXIT") {
              // console.log("게임 종료 정보", receivedMessage.data);
              setUserList(receivedMessage.data);
            } else if (receivedMessage.type === "END_GAME") {
              // console.log("", receivedMessage.data.stockInfo);
              setLastTurnStock(receivedMessage.data.stockInfo);
              setLastTurnStockModal(true);
              setTimeout(() => {
                if (isManager === "true")
                  axios
                    .put(
                      `https://j10d202.p.ssafy.io/api/game/end/${roomId}`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        },
                      }
                    )
                    .then((response) => {
                      // console.log(response);
                      setLastTurnStockModal(false);
                    })
                    .catch((error) => {
                      console.error("게임 종료 요청에 실패했습니다:", error);
                    });
              }, 5000);
            }
          }
        );
      },
      (error) => {
        // 연결이 끊어졌을 때 재연결을 시도합니다.
        // console.log("STOMP: Connection lost. Attempting to reconnect", error);
        reconnectInterval = setTimeout(connect, 1000); // 1초 후 재연결 시도
      }
    );

    return () => {
      // console.log("unmounting...");
      // console.log(stompClientRef.current);

      if (gameStompRef.current) {
        gameStompRef.current.unsubscribe(); // 구독 해제
      }

      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.disconnect(() => {
          // console.log("WebSocket 연결이 종료되었습니다.");
        });
      }

      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
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
      <div className={styles.views}>
        {/* 현재 유저의 정보를 전달합니다. */}
        <div className={styles.player1}>
          <Players
            user={currentUser ? currentUser : null}
            userReady={myReady}
            myPoint={myPoint}
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
          <p className={styles.turn}>{year}년 증시</p>
        </div>
        <button className={styles.readyButton} onClick={onClickReady}>
          {ohMyReady ? "CANCEL" : "READY"}
        </button>
      </div>
      <div className={styles.chat}>
        <Chat roomId={roomId} userNicks={userNicks} />
      </div>
      <div className={styles.investment}>
        <Investment stockInfo={stockInfo} />
      </div>
      <div className={styles.myMenu}>
        <button className={styles.myMenu1} onClick={exitGame}>
          나가기
        </button>
        <button className={styles.myMenu2} onClick={openMyStockModal}>
          내 주식 확인
        </button>
        <button
          className={styles.myMenu3}
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
          myPoint={myPoint}
          setMyPoint={setMyPoint}
        />
      )}

      {myStockModal && <MyStock setMyStockModal={setMyStockModal} />}

      {myInfoModal && (
        <MyInfo setMyInfoModal={setMyInfoModal} myInfoList={myInfoList} />
      )}

      {resultModal && (
        <Result
          className={styles.result}
          setResultModal={setResultModal}
          result={result}
          stompClientRef={stompClientRef}
          gameStompRef={gameStompRef}
        />
      )}

      {changeTurnModal && (
        <ChangeTurn setChangeTurnModal={setChangeTurnModal} year={year} />
      )}

      {lastTurnStockModal && (
        <LastTurnStockInfo
          className={styles.lastTurnStockInfo}
          setLastTurnStockModal={setLastTurnStockModal}
          lastTurnStock={lastTurnStock}
        />
      )}
    </div>
  );
}

// GamePlay.__isStatic = true;
