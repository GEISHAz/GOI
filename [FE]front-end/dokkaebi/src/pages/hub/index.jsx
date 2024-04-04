import Background from "../../images/hub/background4.gif";
import HubTop from "../../components/hub/hubTop.jsx";
import HubBottom from "../../components/hub/hubBottom.jsx";
import questionMark from "../../images/main/questionMark.png";
import styles from "./index.module.css";
import Explanation from "../../components/hub/Explanation.jsx";
import React, { useState } from "react";

export default function Hub() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  };
  const [explanationModal, setExplanationModal] = useState(false); // 설명서 모달 상태

  return (
    <div style={backgroundStyle}>
      <HubTop />
      <HubBottom />
      <div className={styles.explantion}>
        <img
          src={questionMark}
          alt="설명서"
          className={styles.questionMark}
          onClick={() => setExplanationModal(true)}
        />
      </div>
      {explanationModal && (
        <Explanation
          setExplanationModal={setExplanationModal}
          className={styles.explanationModalClass}
        />
      )}
    </div>
  );
}
