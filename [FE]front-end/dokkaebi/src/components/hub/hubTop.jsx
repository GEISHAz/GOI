import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoginButton from '../../images/hub/loginButton.gif';
import LogoutButton from '../../images/hub/logoutButton.gif';
import GoBack from '../back/goMain.jsx';
import BackA from '../../images/backButton/backA.png';
import BackB from '../../images/backButton/backB.png';
import styles from './button.module.css'
import axios from 'axios';

export default function HubTop() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("isLogin") === "true"; // 로그인 상태 가져오기
  const [isHovering, setIsHovering] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      // 백엔드 서버로 로그아웃 요청 보내기
      await axios.post('https://j10d202.p.ssafy.io/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 액세스 토큰 추가
        },
      });
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("isLogin"); // 세션 스토리지에서 로그인 상태 제거
      // dispatch(setIsLogin(false)); // 로그인 상태를 false로 업데이트
      navigate("/hub");
      alert("로그아웃 되었어요 !");
    } catch (error) {
      console.log('로그아웃 요청 중 에러 발생:', error);
      alert("로그아웃 처리 중 문제가 발생했어요 !");
    }
  };

  const handleLogIn = () => {
    navigate('/join')
  }

  return (
    <div className="flex items-center justify-between">
      {/* 뒤로가기 */}
      <GoBack />
      
      {/* 로그인, 로그아웃 */}
      <div className='mt-5 my-auto flex justify-end mr-5 '>
        {isLogin ? (
          // 로그인 상태일 때 "Logout" 버튼 표시
          <button onClick={handleLogout} className={`px-5 ${styles.logoutButton}`}>
            <img src={LogoutButton} alt="로그인버튼"/>
          </button>
        ) : (
          // 로그아웃 상태일 때 "Login" 링크 표시
          <button onClick={handleLogIn} className={` ${styles.loginButton}`}>
            <img src={LoginButton} alt="로그인버튼" className='font-bold text-white'/>
          </button>
        )}
      </div>
    </div>
  );
};