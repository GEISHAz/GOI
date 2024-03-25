import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './login.module.css'
import KakaoLogin from '../../images/login/kakaologin.png';
// import NaverLogin from '../../images/login/googleLogin.png';
// import WithA from '../../images/login/with.png';
// import WithB from '../../images/login/naverWith.png';
// import Kakao from '../../images/login/kakao.png';
// import Naver from '../../images/login/naver.png';
import yellow from '../../images/login/yellow.gif';
import pink from '../../images/login/pink.gif';
import orange from '../../images/login/orange.gif';
import Back from '../back/goHub.jsx';

export default function LoginComponent() {
  // const navigate = useNavigate();
  // const [isHovering, setIsHovering] = useState(false);

  const KAKAO_AUTH_URL = 'https://j10d202.p.ssafy.io/oauth2/authorization/kakao?redirect_uri=https://localhost:5173/callBack&mode=login';
  // const NAVER_AUTH_URL = 'https://j10d202.p.ssafy.io/oauth2/authorization/naver?redirect_uri=https://j10d202.p.ssafy.io/callBack&mode=login';
  
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 클릭 확인")
    window.location.href = KAKAO_AUTH_URL;
  };

  // const handleNaverLogin = () => {
  //   console.log("네이버 로그인 클릭 확인")
  //   window.location.href = NAVER_AUTH_URL;
  // }

  return (
    <div className="flex flex-col h-96">
      {/* 뒤로가기 */}
      <Back />

      {/* 카카오 로그인 */}
      <div className={`${styles.loginBG} flex flex-col items-center justify-center w-1/3 mx-auto bg-black/60 rounded-3xl p-10`}>
        <h1 className='font-bold text-white text-3xl mb-10'>로 그 인</h1>
        <h2 className='font-bold text-white text-xl mb-10'>도깨비로 참여하세요 !</h2>
        <div className='w-1/4 flex justify-center mb-20'>
          <img src={orange} alt="주황도깨비" />
          <img src={pink} alt="핑크도깨비" />
          <img src={yellow} alt="노랑도깨비" />
        </div>
        <img
          src={KakaoLogin}
          alt="카카오 로그인"
          className={`${styles.clickCursor} w-80`}
          onClick={handleKakaoLogin}
        />
        {/* <div className='w-1/4 flex justify-center mb-10'>
          <img src={WithA} alt="카카오 로그인" />
          <img src={Kakao} alt="카카오 로그인" />
        </div> */}
        {/* 네이버 로그인 */}
        {/* <img
          src={NaverLogin}
          alt="구글 로그인"
          className='w-1/2'
          onClick={handleNaverLogin}
        /> */}
        {/* <div className='w-1/4 flex justify-center mb-5'>
          <img src={WithB} alt="네이버 로그인" />
          <img src={Naver} alt="네이버 로그인" />
        </div> */}
      </div>
    </div>
  );
}