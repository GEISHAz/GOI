import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../features/login/authSlice';
import LoginButton from '../../images/hub/loginButton.gif';
import LogoutButton from '../../images/hub/logoutButton.gif';
import BackA from '../../images/hub/backA.png';
import BackB from '../../images/hub/backB.png';
import styles from './button.module.css'

export default function HubTop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin); // 로그인 상태 가져오기
  const [isHovering, setIsHovering] = useState(false);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    dispatch(setIsLogin(false)); // 로그인 상태를 false로 업데이트
    navigate("/hub");
    alert("로그아웃 되었어요 !")
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
      <div className='mt-5 mr-5 my-auto'>
        {isLogin ? (
          // 로그인 상태일 때 "Logout" 버튼 표시
          <button onClick={handleLogout}>
            <img src={LogoutButton} alt="로그인버튼" className={styles.logoutButton}/>
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