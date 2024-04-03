import React, { useRef } from "react";
import styles from "./Explanation.module.css";
// import ExplanationImg from "../../images/main/Frame 2431.png";

export default function Explanation({ setExplanationModal }) {
  const modalBackGround = useRef();
  return (
    <div
      className={styles.background}
      ref={modalBackGround}
      onClick={(e) => {
        if (e.target === modalBackGround.current) {
          setExplanationModal(false);
        }
      }}
    ></div>
  );
}
