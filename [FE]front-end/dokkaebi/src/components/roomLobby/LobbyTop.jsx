import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LobbyTop.module.css";
import messenger from "../../images/square/icon_messenger.png";
import axios from "axios";

export default function LobbyTop() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");
  const channelId = sessionStorage.getItem("channelId");

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
          <button
            className={`flex items-center justify-center font-Bit text-4xl ${styles.textButton}`}
          >
            READY
          </button>
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
