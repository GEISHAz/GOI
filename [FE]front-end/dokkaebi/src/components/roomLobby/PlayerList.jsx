import React, { useState, useEffect } from "react";
import styles from "./PlayerList.module.css";
import profile from "../../images/gamePlay/bat_slower.gif";
import coin from "../../images/roomLobby/coin.png";
import crown from "../../images/roomLobby/crown.png";
import blue from "../../images/character/blue.gif";
import brown from "../../images/character/brown.gif";
import green from "../../images/character/green.gif";
import yellow from "../../images/character/yellow.gif";
import pink from "../../images/character/pink.gif";
import orange from "../../images/character/orange.gif";

export default function PlayerList({ userList, isStart, amIManager, handleKick, roomNum, userCnt }) {
  const [start, setStart] = useState(isStart);

  // 이미지 로드 실패 시 대체 이미지를 설정하는 함수
  const onErrorProfileImg = (e) => {
    e.target.src = profile;
  };
  const images = [
    { id: 1, src: blue, alt: "파랑도깨비" },
    { id: 2, src: brown, alt: "밤색도깨비" },
    { id: 3, src: yellow, alt: "노랑도깨비" },
    { id: 4, src: pink, alt: "핑크도깨비" },
    { id: 5, src: orange, alt: "오렌지도깨비" },
    { id: 6, src: green, alt: "초록도깨비" },
  ];
  const findImageById = (imageId) =>
    images.find((image) => image.id === imageId);

  const users = Array.isArray(userList) ? userList : [userList];

  if (!Array.isArray(users)) {
    return null; // 또는 로딩 스피너, 에러 메시지 등을 반환할 수 있습니다.
  }

  useEffect(() => {
    if (isStart === true) {
      setStart(true);
    } else if (isStart === false) {
      setStart(false);
    }
  }, [isStart]);

  return (
    <div className={`flex justify-center ${styles.roomPlayerContainer}`}>
      <div className={`flex flex-col justify-center items-center my-auto mr-5 ${styles.playerInfoContainer}`}>
        <h1 className={`text-center text-2xl font-Bit ${styles.roomInfo}`}>도깨비 방 정보</h1>
        <div className="flex mt-2">
          <h1 className={`text-center font-bold text-2xl mr-2 ${styles.roomNumInfo}`}>방 번호 :</h1>
          <span className={`text-center font-bold text-2xl ${styles.roomNum}`}> {roomNum}</span>
        </div>
        <div className="flex mt-2">
          <h1 className={`text-center font-bold text-2xl mr-2 ${styles.userCntInfo}`}>현재 인원 :</h1>
          <span className={`text-center font-bold text-2xl ${styles.userCnt}`}>{userCnt}</span>
          <h1 className="text-center font-bold text-2xl">/4</h1>
        </div>
        {start && (
          <div className="flex mt-2">
            <h1 className={`text-center text-xl font-Bit ${styles.allReadyAlarm}`}>모두 준비가 되었어요!</h1>
          </div>
        )}
      </div>
      <div className={styles.playerContainer}>
        {/* 컨테이너 4조각 분할 */}
        <div className="grid grid-cols-2 gap-4 p-1">
          {users.map((user, index) => {
            const userImage = findImageById(user?.imageId);
            return (

              // 플레이어 정보를 담은 컨테이너 playerBox
              <div
                key={index}
                className={`${styles.playerBox} flex flex-col justify-center items-center`}
              >
                <div className="flex flex-row w-full justify-start items-center">
                  <img
                      className="w-20 ml-2"
                      src={user?.profileImg || (userImage ? userImage.src : "")}
                      alt="profile"
                      onError={onErrorProfileImg}
                  />
                  <p className="font-Bit text-xl mx-4">{user?.userNick}</p>
                    {user.isManager && (
                      <img 
                        className="w-8 mr-8" 
                        src={crown} 
                        alt="방장 아이콘" />
                    )}
                    {amIManager && !user.isManager && (
                      <button onClick={() => handleKick(user?.userId)} className={styles.kickButton}>
                        강퇴
                      </button>
                    )}          
                </div>

                <div className="flex flex-row w-full justify-between items-center">
                  <p
                    className={`${styles.playerReady} ${
                    user.isReady ? styles.playerReadyActive : ""
                    }`}
                    >
                    READY
                  </p>
                  <div className="flex flex-row mr-8">
                    <img className="w-12 mx-2" src={coin} alt="EXP 아이콘" />
                    <p className={styles.playerTotalMoney}>{user.exp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  </div>
                </div>
              </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
