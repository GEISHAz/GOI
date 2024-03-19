import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../features/login/authSlice';

export default function HubTop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin); // 로그인 상태 가져오기
  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    dispatch(setIsLogin(false)); // 로그인 상태를 false로 업데이트
    navigate("/hub");
    alert("로그아웃 되었어요 !")
  };

  return (
    <div className="flex items-center justify-between">
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-xl'
        >
          Back
        </button>
      </div>
      <div className='mt-5 mr-10'>
        {isLogin ? (
          // 로그인 상태일 때 "Logout" 버튼 표시
          <button onClick={handleLogout} className='font-bold text-white text-xl'>
            Logout
          </button>
        ) : (
          // 로그아웃 상태일 때 "Login" 링크 표시
          <Link to='/login' className='font-bold text-white text-xl'>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};