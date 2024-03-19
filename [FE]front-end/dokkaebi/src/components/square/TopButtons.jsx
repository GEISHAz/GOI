import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopButtons.module.css';

import messenger from '../../images/square/icon_messenger.png';
import refresh from '../../images/square/icon_refresh.png';
import search from '../../images/square/icon_search.png';


export default function TopButtons() {
  const navigate = useNavigate();

  return (
    // 상단 버튼들 컨테이너
    <div className='flex items-center justify-between p-5'>
      
      {/* 뒤로가기 버튼 */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-4xl'
        >
          Back
        </button>
      </div>
      

      <div className='flex-grow flex justify-center gap-4 ml-20'>
        {/* 방 만들기 버튼 */}
        <button className={`flex items-center justify-center font-Bit text-2xl ${styles.textButton}`}>방 만들기</button>
        {/* 빠른 입장 버튼 */}
        <button className={`flex items-center justify-center font-Bit text-2xl ${styles.textButton}`}>빠른 입장</button>
        {/* 방 찾기 버튼 */}
        <button className={`flex items-center justify-center font-Bit text-2xl ${styles.searchButton}`}>방 찾기</button>
      </div>

      {/* 우측 상단 아이콘 이미지 버튼 2개 */}
      <div className='flex'>
        <button className={`${styles.refreshButton}`}>
          <img src={refresh} alt="RefreshButton" />
        </button>
        <button className={`${styles.messengerButton}`}>
          <img src={messenger} alt="MessengerButton" />
        </button>
      </div>
    </div>
  );
}