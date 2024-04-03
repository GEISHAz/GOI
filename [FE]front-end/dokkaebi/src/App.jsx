import React, { useEffect } from 'react';
import Router from './router.jsx';
import './App.css';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = '새로고침 시 문제가 발생할 수 있어요 ! 조심해주세요 !';
      e.returnValue = message;
      return message;
    };

    if (location.pathname !== '/join') {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // 오디오 파일 로드 및 재생
    const playSound = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    };

    // 클릭된 요소가 버튼 내부에 있는지 확인하고, 버튼 클릭 시 효과음 재생
    const handleClick = (event) => {
      let element = event.target;
      while (element != null) {
        if (element.tagName === 'BUTTON') {
          // 호스팅 환경의 정확한 파일 경로로 변경하세요
          playSound('/public/bgm/ddick.mp3');
          break;
        }
        element = element.parentElement;
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick);
    };
  }, [location.pathname, audioContext]);


  return (
    <div className='font-Galmuri11'>
      <Router />
    </div>
  )
}

export default App
