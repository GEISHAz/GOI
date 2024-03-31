// import React from 'react'
import styles from "./Players.module.css";
import profile from "../../../images/gamePlay/bat_slower.gif";
import blue from "../../../images/character/blue.gif";
import brown from "../../../images/character/brown.gif";
import green from "../../../images/character/green.gif";
import yellow from "../../../images/character/yellow.gif";
import pink from "../../../images/character/pink.gif";
import orange from "../../../images/character/orange.gif";
import { useEffect, useState } from "react";

export default function Players({ user }) {
  if (!user) {
    return null; // 또는 로딩 스피너, 에러 메시지 등을 반환할 수 있습니다.
  }
  const [ready, setReady] = useState(false);
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
  const userImage = findImageById(user.imageId);

  // const users = Array.isArray(user) ? user : [user];

  // if (!Array.isArray(users)) {
  //   return null; // 또는 로딩 스피너, 에러 메시지 등을 반환할 수 있습니다.
  // }
  useEffect(() => {
    console.log(user);
  }, [user]);

  return user ? (
    <div className={styles.playerComponents}>
      <img
        src={user.profileImg || (userImage ? userImage.src : "")}
        alt="profile"
        onError={onErrorProfileImg}
      ></img>
      <div className={styles.playerInfo}>
        <div className={styles.player}>
          <p className={styles.playerNickName}>{user.userNick}</p>
          <p
            className={`${styles.playerReady} ${
              user.isReady ? styles.playerReadyActive : ""
            }`}
          >
            READY
          </p>
        </div>
        <p className={styles.playerTotalMoney}>{user.totalCost}</p>
      </div>
    </div>
  ) : (
    <div>유저 없으면 뭐넣지</div>
  );
}
