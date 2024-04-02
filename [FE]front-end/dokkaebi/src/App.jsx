import React, { useEffect } from 'react';
import Router from './router.jsx';
import './App.css';

function App() {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = '새로고침 시 문제가 발생할 수 있어요 ! 조심해주세요 !';
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='font-Galmuri11'>
      <Router />
    </div>
  )
}

export default App
