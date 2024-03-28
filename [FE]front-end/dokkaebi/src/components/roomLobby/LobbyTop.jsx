import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LobbyTop.module.css";
import messenger from "../../images/square/icon_messenger.png";
import axios from "axios";
import { connect, useDispatch, useSelector } from "react-redux";

export default function LobbyTop({ userList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.auth.userNickname);
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");
  const channelId = sessionStorage.getItem("channelId");

  const [isStart, setIsStart] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [amIManager, setAmIManager] = useState(false);

  useEffect(() => {
    userList.forEach((user) => {
      if (user.userNick === userNickname) {
        setAmIManager(user.isManager);
        console.log("나는 방장 : ", amIManager);
      }
    });
  }, [userList]);

  // userList.forEach((user) => {
  //   if (user.nickname === userNickname) {
  //     amIManager = user.isManager;
  //     console.log("나는 방장 : ", amIManager);
  //   }
  // });

  const handleBackButtonClick = () => {
    axios
      .delete(`https://j10d202.p.ssafy.io/api/room/exit/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("방 나가기 성공");
        sessionStorage.removeItem("roomId");
        navigate(`/square/${channelId}`);
      })
      .catch((err) => {
        console.log(err);
        console.log("방 나가기 실패");
      });
  };

  const handleReadyButtonClick = () => {
    axios
      .post(
        `https://j10d202.p.ssafy.io/api/room/ready/${roomId}`,
        {},
        {
          headers: { accessToken: `Bearer ${accessToken}` },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("레디 바뀜 확인");
        setIsReady(!isReady);
      })
      .catch((err) => {
        console.log(err);
        console.log("레디 바뀜 실패");
      });
  };

  const handleStartButtonClick = () => {
    axios
      .put(`https://j10d202.p.ssafy.io/api/room/start/${roomId}`, {
        headers: { accessToken: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        console.log("게임 시작");
      })
      .catch((err) => {
        console.log(err);
        console.log("게임 시작 실패");
      });
  };

  return (
    <>
      <div className="flex items-center justify-between p-5">
        {/* 뒤로가기 버튼 */}
        <div>
          <button
            onClick={handleBackButtonClick}
            className="font-bold text-white text-4xl"
          >
            Back
          </button>
        </div>

        <div className="flex-grow flex justify-center gap-4">
          {/* 레디 버튼 */}
          {amIManager ? (
            <button
              onClick={handleStartButtonClick}
              disabled={!isReady}
              className={`flex items-center justify-center font-Bit text-4xl ${styles.textButton} `}
            >
              START
            </button>
          ) : (
            <button
              onClick={handleReadyButtonClick}
              className={`flex items-center justify-center font-Bit text-4xl ${styles.textButton}`}
            >
              {isReady ? "Cancel" : "Ready"}
            </button>
          )}
        </div>

        {/* 메신저 버튼 */}
        <div className="flex">
          <button className={`${styles.messengerButton}`}>
            <img src={messenger} alt="MessengerButton" />
          </button>
        </div>
      </div>
    </>
  );
}
