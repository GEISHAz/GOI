import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './ranking.module.css';

export default function Ranking() {
  const navigate = useNavigate();
  
  // const myrank
  // 로그인한 유저의 프로필 사진, 닉네임, 포인트

  // 지금은 dummy
  // top 10 랭커의 프로필 사진, 닉네임, 포인트 데이터 필요함
  const rankers = [
    { profile: "프로필", name: "닉네임", point: "포인트" },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-4xl'
        >
          Back
        </button>
      </div>

    
      {/* 랭킹 컨테이너 */}
      <div className={`flex flex-col items-center justify-center mx-auto flex-grow  ${styles.rankContainer}`}>
        <div className="py-2 px-4 w-full flex flex-row items-center">
          <h1 className="text-white font-Bit text-6xl mb-4">랭킹</h1>
          {/* 마이랭크 컨테이너 */}
          <div className={`text-gray font-Bit text-2xl ${styles.myrankBox}`}>나의 순위</div>
          </div>
          {/* Top 10 랭커 컨테이너 */}
          <div className="flex w-full justify-around my-4">
            <div className={`${styles.rankBox}`}>컨테이너 1</div>
            <div className={`${styles.rankBox}`}>컨테이너 2</div>
          </div>

        {/* <div className="grid grid-cols-2 gap-4 w-full m-4"></div> */}
      </div>
    </div>
  );
}