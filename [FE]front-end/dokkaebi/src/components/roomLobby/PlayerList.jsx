import React from "react";
import styles from "./PlayerList.module.css";
import profile from "../../images/gamePlay/bat_slower.gif";
import coin from "../../images/roomLobby/coin.png";
import blue from "../../images/character/blue.gif";
import brown from "../../images/character/brown.gif";
import green from "../../images/character/green.gif";
import yellow from "../../images/character/yellow.gif";
import pink from "../../images/character/pink.gif";
import orange from "../../images/character/orange.gif";

export default function PlayerList({ userList }) {
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

  return (
    <div className={styles.PlayerContainer}>
      <div className="grid grid-cols-2 gap-4 p-4">
        {users.map((user, index) => {
          const userImage = findImageById(user.imageId);
          return (
            <div
              key={index}
              className={`${styles.PlayerBox} grid grid-cols-2 gap-5`}
            >
              <div className={styles.playerComponents}>
                <div className="flex flex-col items-center">
                  <img
                    src={user.profileImg || (userImage ? userImage.src : "")}
                    alt="profile"
                    onError={onErrorProfileImg}
                  />
                  <p
                    className={`${styles.playerReady} ${
                      user.isReady ? styles.playerReadyActive : ""
                    }`}
                  >
                    READY
                  </p>
                </div>

                <div className={styles.playerInfo}>
                  <div className={styles.player}>
                    <p className={styles.playerNickName}>{user.userNick}</p>
                    <div className="flex flex-row items-center">
                      <img className="w-12 mr-2" src={coin} alt="coin icon" />
                      <p className={styles.playerTotalMoney}>{user.exp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
