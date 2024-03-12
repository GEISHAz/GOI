import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css'

import Login from '../../images/login/login.gif';
import With from '../../images/login/with.png';
import Kakao from '../../images/login/kakao.png';
import yellow from '../../images/login/yellow.gif';
import pink from '../../images/login/pink.gif';
import orange from '../../images/login/orange.gif';

export default function LoginComponent() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* 뒤로가기 */}
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-xl'
        >
          Back
        </button>
      </div>

      {/* 로그인 */}
      <div className={`${styles.loginBG} flex flex-col items-center justify-center w-1/3 mx-auto bg-black/60 rounded-3xl p-10`}>
        <h1 className='font-bold text-white text-3xl mb-10'>로 그 인</h1>
        <h2 className='font-bold text-white text-xl mb-10'>도깨비로 참여하세요 !</h2>
        <div className='w-1/4 flex justify-center mb-20'>
          <img src={orange} alt="주황도깨비" />
          <img src={pink} alt="핑크도깨비" />
          <img src={yellow} alt="노랑도깨비" />
        </div>
        <img
          src={Login}
          alt="카카오 로그인"
          className='w-1/2'
          onClick={}
        />
        <div className='w-1/4 flex justify-center'>
          <img src={With} alt="카카오 로그인" />
          <img src={Kakao} alt="카카오 로그인" />
        </div>
      </div>

    </div>
  );
}