// import React from 'react'
import { useState } from "react";
import styles from "./InfoList.module.css";
import InfoStoreDetail from "./InfoStoreDetail";
import axios from "axios";

export default function InfoLIst(props) {
  const company = props.company;
  const roomId = sessionStorage.getItem("roomId");
  const accessToken = sessionStorage.getItem("accessToken");
  const [infoStoreDetailModalOpen, setInfoStoreDetailModalOpen] =
    useState(false);
  const openInfoStoreDetailModal = () => {
    setInfoStoreDetailModalOpen(true);
  };

  const [info, setInfo] = useState("가나다라마바사아자차카타파하");

  const getLowStockInfo = () => {
    axios
      .get(
        `https://j10d202.p.ssafy.io/api/stock/info?id=${roomId}&item=${company}&level=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("1단계 정보 가져오기 성공");
        // setInfo(response.data.info)
      })
      .catch((error) => {
        console.log(error);
        console.log("1단계 정보 가져오기 실패");
      });
  };

  const getHighStockInfo = () => {
    axios
      .get(
        `https://j10d202.p.ssafy.io/api/stock/info?id=${roomId}&item=${company}&level=2`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("2단계 정보 요청 성공");
        // setInfo(response.data.info);
      })
      .catch((error) => {
        console.log(error);
        console.log("2단계 정보 요청 실패");
      });
  };

  return (
    <div className={styles.background}>
      <div className={styles.companyArea}>
        <p>{company}</p>
      </div>
      <div className={styles.buttons}>
        <button
          className={styles.levelOneButtons}
          onClick={() => {
            openInfoStoreDetailModal();
            getLowStockInfo();
          }}
        >
          1단계
        </button>
        <hr />
        <button
          className={styles.levelTwoButtons}
          onClick={() => {
            openInfoStoreDetailModal();
            getHighStockInfo();
          }}
        >
          2단계
        </button>
      </div>
      {infoStoreDetailModalOpen && (
        <InfoStoreDetail
          setInfoStoreDetailModalOpen={setInfoStoreDetailModalOpen}
          company={company}
          info={info}
        />
      )}
    </div>
  );
}
