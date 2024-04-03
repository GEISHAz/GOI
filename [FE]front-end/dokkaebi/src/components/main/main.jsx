import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/main/logo.gif";
import playButton from "../../images/main/button_play1.png";
import playButtonClicked from "../../images/main/button_play2.png";
import Explanation from "../../images/main/Frame 2431.png";
import styles from "./main.module.css";

export default function Main() {
  const navigate = useNavigate();
  const [image, setImage] = useState(playButton); // 초기 이미지를 playButton로 설정

  const handleClick = () => {
    setImage(playButtonClicked); // 클릭 시 이미지 변경
    setTimeout(() => navigate("/hub"), 300); // 이미지 변경 후 약간의 딜레이를 두고 페이지 이동
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      {/* 투자의 귀재들 로고 */}
      <div className="pt-40 ml-20">
        <img
          src={Logo}
          alt="투자의 귀재들 로고"
          className={`${styles.mainLogo} m-auto`}
        />
      </div>
      {/* 플레이 버튼 */}
      <div className="flex justify-center pb-60">
        <button
          className={`h-auto w-auto flex justify-center ${styles.playButtons}`}
        >
          <img src={image} alt="Start Button" onClick={handleClick} />
        </button>
      </div>
      {/* <img src={Explanation} alt="설명서" /> */}
    </div>
  );
}
