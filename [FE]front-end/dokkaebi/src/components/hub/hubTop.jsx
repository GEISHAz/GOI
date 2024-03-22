import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../features/login/authSlice';
import LoginButton from '../../images/hub/loginButton.gif';
import LogoutButton from '../../images/hub/logoutButton.gif';
import BackA from '../../images/hub/backA.png';
import BackB from '../../images/hub/backB.png';
import styles from './button.module.css'
import axios from 'axios';

export default function HubTop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin); // 로그인 상태 가져오기
  const [isHovering, setIsHovering] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // 백엔드 서버로 로그아웃 요청 보내기
      await axios.post('https://j10d202.p.ssafy.io/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 액세스 토큰 추가
        },
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      dispatch(setIsLogin(false)); // 로그인 상태를 false로 업데이트
      navigate("/hub");
      alert("로그아웃 되었어요 !");
    } catch (error) {
      console.log('로그아웃 요청 중 에러 발생:', error);
      alert("로그아웃 처리 중 문제가 발생했어요 !");
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      {/* 뒤로가기 */}
      <div className='mt-5 my-auto'>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className='w-full my-auto'
          onClick={() => navigate("/")}
        >
          <img src={isHovering ? BackB : BackA} alt="뒤로가기" className={styles.backButton}/>
        </button>
      </div>
      {/* 로그인, 로그아웃 */}
      <div className='mt-5 my-auto flex justify-end mr-10'>
        {isLogin ? (
          // 로그인 상태일 때 "Logout" 버튼 표시
          <button onClick={handleLogout}  className={`${styles.logoutButton}`}>
            <img src={LogoutButton} alt="로그인버튼"/>
          </button>
        ) : (
          // 로그아웃 상태일 때 "Login" 링크 표시
          <Link to='/login' className='font-bold text-white text-xl'>
            <img src={LoginButton} alt="로그인버튼" className={styles.loginButton}/>
          </Link>
        )}
      </div>
    </div>
  );
};