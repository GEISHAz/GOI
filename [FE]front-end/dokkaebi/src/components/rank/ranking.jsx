import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useSelector } from 'react-redux';
import axios from "axios";
import blue from '../../images/signUp/blue.gif';
import brown from '../../images/signUp/brown.gif';
import green from '../../images/signUp/green.gif';
import yellow from '../../images/signUp/yellow.gif';
import pink from '../../images/signUp/pink.gif';
import orange from '../../images/signUp/orange.gif';
import One from '../../images/rank/1st.png';
import Two from '../../images/rank/2nd.png';
import Three from '../../images/rank/3rd.png';
import Back from '../back/goHub.jsx';
import styles from './ranking.module.css';

export default function Ranking() {
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [myInfo, setMyInfo] = useState({ exp: null, rank: null }); // 본인 정보
  const [otherUsers, setOtherUsers] = useState([]); // 다른 유저 정보

  const images = [
    { id: 1, src: blue, alt: "파랑도깨비" },
    { id: 2, src: brown, alt: "밤색도깨비" },
    { id: 3, src: yellow, alt: "노랑도깨비" },
    { id: 4, src: pink, alt: "핑크도깨비" },
    { id: 5, src: orange, alt: "오렌지도깨비" },
    { id: 6, src: green, alt: "초록도깨비" },
  ];

  // imageId를 받아 해당하는 이미지 객체를 반환하는 함수
  const findImageById = (imageId) => images.find(image => image.id === imageId);

  useEffect(() => {
    const fetchUserEXP = async () => {
      try {
        const res = await axios.get(`https://j10d202.p.ssafy.io/api/users/rank`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("리스폰스 확인 1 :", res)
        if (res.status === 200 && res.data.data) {
          // console.log("유저 id 확인", res.data.data.id);
          // console.log("유저 닉네임 확인", res.data.data.nickName);
          // console.log("유저 경험치 확인", res.data.data.exp);
          // console.log("유저 프로필 확인", res.data.data.imageId);
          setOtherUsers(res.data.data);
        } else {
          throw new Error('에러 발생 1');
        }
      } catch (error) {
        console.error('유저들 정보 불러오기 실패', error);
      }
    };

    const fetchMyInfo = async () => {
      try {
        const res = await axios.get(`https://j10d202.p.ssafy.io/api/users/${userId}/rank`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("리스폰스 확인 2 :", res)
        if (res.status === 200 && res.data.data) {
          console.log("내 순위 확인", res.data.data.rank);
          console.log("내 경험치 확인", res.data.data.exp);
          setMyInfo({ rank: res.data.data.rank, exp: res.data.data.exp, });
        } else {
          throw new Error('에러 발생 2');
        }
      } catch (error) {
        console.error('내 정보 불러오기 실패', error);
      }
    };

    fetchUserEXP();
    fetchMyInfo();
  }, [accessToken]);

  return (
    <div className="flex flex-col h-20">
      {/* 뒤로가기 */}
      <Back />

      <h1 className={`text-center font-Bit text-6xl mb-4 ${styles.rankHeader}`}>RANKING</h1>

      <div className="flex flex-row justify-center items-center mb-5">
        {/* 자신의 랭킹 확인 */}
        <div className={`flex flex-col items-center justify-center mr-10 p-5 border rounded-lg my-auto ${styles.myrankBox}`}>
          <h2 className="text-2xl mb-5 text-gray font-Bit">나의 RANK</h2>
          <div className="mb-5">
            <h3 className={`text-xl text-bold ${styles.rankLabel}`}>
              당신의 순위: 
              <span className={`text-xl text-bold ${styles.rankValue}`}>
                {myInfo.rank ? (myInfo.rank <= 100 ? `${myInfo.rank}위` : "순위권 외") : "정보 로딩 중..."}
              </span>
            </h3>
          </div>
          <div className="mb-5">
            <h3 className={`text-xl text-bold ${styles.rankLabel}`}>
              현재&nbsp;
              <span className={`text-xl text-bold ${styles.rankValue}`}>
                {myInfo.exp}&nbsp;
              </span>
              원을 보유 중이에요
            </h3>
          </div>
        </div>

        {/* 유저 랭킹 TOP 100 */}
        <div className={`flex flex-col items-center justify-center w-1/2 ${styles.rankContainer}`}>
          <h1 className="text-bold font-Bit mb-2 text-3xl text-center">TOP 100</h1>
          <div className={`${styles.scrollCustom} overflow-y-auto`}>
            {otherUsers.map((user, index) => {
              const image = findImageById(user.imageId); // 유저의 imageId에 해당하는 이미지 객체 찾기
              return (
                <div key={user.id || index} className={`flex items-center justify-between p-2 border-b border-gray-200 w-full ${styles.rankItemContainer}`}>
                  <div className={`flex flex-row my-auto ${styles.rankDetail}`}>
                    <span className="my-auto">{user.rankByExp}위</span>
                    {user.rankByExp === 1 && <img src={One} alt="1등" className={styles.trophyImg} />}
                    {user.rankByExp === 2 && <img src={Two} alt="2등" className={styles.trophyImg} />}
                    {user.rankByExp === 3 && <img src={Three} alt="3등" className={styles.trophyImg} />}
                    <div className='my-auto ml-5'>
                      {image && <img src={image.src} alt={image.alt} className="h-10 w-10" />}
                    </div>
                    <div className='my-auto ml-5'>
                      <span>{user.nickName}</span>
                    </div>
                  </div>
                  <div className={`flex justify-end ${styles.rankDetail}`}>
                    <span>{user.exp.toLocaleString()}원</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}