import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackA from '../../images/hub/backA.png';
import BackB from '../../images/hub/backB.png';
import styles from './ranking.module.css';
import { useSelector } from 'react-redux';
import axios from "axios";

export default function Ranking() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  // 본인
  const userProfileImage = useSelector((state) => state.auth.userProfileImage);
  const userNickname = useSelector((state) => state.auth.userNickname);
  const [myEXP, setMyEXP] = useState(null);
  const [myRank, setMyRank] = useState(null);
  // 다른유저들 정보 (이름, 이미지, )
  const [isUserId, setIsUserId] = useState([]);
  const [isUserNames, setIsUserNames] = useState([]);
  const [isuserEXP, setIsUserEXP] = useState([]);
  const [isUserProfile, setIsUserProfile] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchUserEXP = async () => {
      try {
        
        const res = await axios.get(`https://j10d202.p.ssafy.io/api/users/rank`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("리스폰스 확인 1 :", res)
        if (res.status === 200 && res.data) {
          console.log("유저 id 확인", res.data.id);
          console.log("유저 닉네임 확인", res.data.nickName);
          console.log("유저 경험치 확인", res.data.exp);
          console.log("유저 프로필 확인", res.data.imageId);
          setIsUserId(res.data.id);
          setIsUserProfile(res.data.imageId);
          setIsUserNames(res.data.nickName);
          setIsUserEXP(res.data.exp);
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
        if (res.status === 200 && res.data) {
          console.log("내 순위 확인", res.data.rank);
          console.log("내 닉네임 확인", res.data.nickName);
          console.log("내 경험치 확인", res.data.exp);
          setMyEXP(res.data.exp);
          setMyRank(res.data.rank);
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
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <div className='mt-5 flex items-center justify-start'>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className='w-48 my-auto'
          onClick={() => navigate("/hub")}
        >
          <img src={isHovering ? BackB : BackA} alt="뒤로가기" className={styles.backButton}/>
        </button>
      </div>

      <h1 className={`text-center font-Bit text-6xl mb-4 ${styles.rankHeader}`}>순 위</h1>
    
      <div className="flex flex-row justify-center items-center overflow-auto h-full">
        <div className="flex flex-col items-center justify-center w-full">
          {userEXP.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-2 border-b border-gray-200 w-full">
              <span>{index + 1}위</span>
              <img src={userProfileImage} alt="유저 프로필" className="h-10 w-10 rounded-full" />
              <span>{userNickname}</span>
              <span>{user.exp.toLocaleString()}원</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}