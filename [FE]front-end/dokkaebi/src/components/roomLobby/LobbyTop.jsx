import React, { useState } from 'react'; // useState를 추가합니다
import { useNavigate } from 'react-router-dom';
import styles from './LobbyTop.module.css';

import messenger from '../../images/square/icon_messenger.png';


export default function LobbyTop() {
  const navigate = useNavigate();
  
  return (
    <>
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

        <div className='flex-grow flex justify-center gap-4'>
          {/* 레디 버튼 */}
          <button 
            // onClick={}
            className={`flex items-center justify-center font-Bit text-4xl ${styles.textButton}`}>
            READY
          </button>
        </div>

        {/* 메신저 버튼 */}
        <div className='flex'>
          <button className={`${styles.messengerButton}`}>
            <img src={messenger} alt="MessengerButton" />
          </button>
        </div>
      </div>


    </>
  );
}
