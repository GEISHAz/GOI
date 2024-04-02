import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '../api/accessCheck.js';
import BGMPlayer from '../components/bgm/bgmPlayer.jsx';
import { useDispatch } from 'react-redux';
import { BGMProvider } from './bgm/bgmContext.jsx';

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
          console.log("새 액세스 토큰을 받지 못했어요 !");
          // navigate('/login');
        } else {
          // console.log("액세스 토큰 갱신함")
        }
      }
    };
    checkToken();
  }, [checkAccess, navigate]);

  return (
    <BGMProvider> {/* BGMProvider로 전체 앱을 감싸 BGM 상태 관리 가능하게 함 */}
      {children}
      <BGMPlayer currentPath={location.pathname}/>
    </BGMProvider>
  );
};

export default AuthWrapper;
