import React, { useEffect } from 'react';
import Router from './router.jsx';
import './App.css';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    // 새로고침, 페이지 종료 시 경고 알림 이벤트 함수
    const handleBeforeUnload = (e) => {
      const message = '새로고침 시 문제가 발생할 수 있어요 ! 조심해주세요 !';
      e.returnValue = message;
      return message;
    };

    // 로그인 경로가 아닐 때만 beforeunload 이벤트 리스너를 추가하여 로그인할 땐 이벤트 제외
    if (location.pathname !== '/join') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  return (
    <div className='font-Galmuri11'>
      <Router />
    </div>
  )
}

export default App
