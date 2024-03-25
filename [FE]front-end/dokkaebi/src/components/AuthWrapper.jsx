import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '../api/accessCheck.js';
import BGMPlayer from '../components/bgm/bgmPlayer.jsx';
import { useDispatch } from 'react-redux';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [checkAccess] = useAuthCheck();

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = sessionStorage.getItem('accessToken');

      if (accessToken) {
        const isAuthenticated = await checkAccess();
        if (!isAuthenticated) {
          console.log("새 액세스 토큰을 받지 못함");
          // navigate('/login');
        } else {
          // console.log("액세스 토큰 갱신함")
        }
      }
    };
    checkToken();
  }, [checkAccess, navigate]);

  return (
    <>
      {children}
      {/* BGMPlayer는 AuthWrapper에 의해 전역적으로 포함되므로, 어느 페이지에서나 배경음악 제어가 가능 */}
      <BGMPlayer />
    </>
  );
};

export default AuthWrapper;
