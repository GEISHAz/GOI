import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ChoiceModal from './choiceModal.jsx';
import { useSelector } from 'react-redux';
import styles from './kakaoLogin.module.css'
import signUp from '../../images/signUp/signUp.gif';
import blue from '../../images/signUp/blue.gif';
import brown from '../../images/signUp/brown.gif';
import green from '../../images/signUp/green.gif';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 모달에서 선택된 사진 불러오기
  const [nickname, setNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // 닉네임 중복검사 로직 (백에서 유효성검사 로직 다 되면 작성예정)
  const handleCheckNickname = () => {
    console.log(nickname);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center mt-2">
      <div className="flex flex-row justify-center items-stretch w-full gap-0">
        {/* 중앙 왼쪽 */}
        <div className={`${styles.loginBG} flex flex-col items-center justify-center w-1/3 bg-black/60 rounded-3xl p-10 mt-10`}>
          <h1 className='font-bold text-white text-3xl mb-10'>첫 도깨비 일원이신가요?</h1>
          <h2 className='font-bold text-white text-xl mb-20'>닉네임과 프로필을 설정해보세요 !</h2>
          <img
            src={signUp}
            alt="카카오 로그인"
            className={`${styles.clickCursor} w-1/2`}
          />
          <div className='w-1/4 flex justify-center mt-10'>
            <img src={blue} alt="파랑도깨비" className='mt-3'/>
            <img src={brown} alt="밤색도깨비" />
            <img src={green} alt="초록도깨비" />
          </div>
        </div>

        {/* 중앙 오른쪽 */}
        <div className={`${styles.loginBG} flex flex-col justify-center w-1/3 bg-black/70 rounded-3xl p-10 mt-10`}>
          <h1 className='font-bold text-white text-left text-3xl mb-5'>닉 네 임</h1>
          <div className="flex w-full justify-start items-center mb-5">
            <input
              type="text"
              className={`text-center bg-white ${styles.inputBackground}`}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className='w-full flex justify-end mb-10'>
            <button
              className={`text-black bg-white font-bold py-2 px-4 rounded ${styles.buttonBackground}`}
              onClick={handleCheckNickname}
            >
              중복검사
            </button>
          </div>
          <h1 className='font-bold text-white text-3xl mb-5'>프로필 설정</h1>
          <div className="text-center mb-4">
            <button onClick={openModal} className={`text-black bg-white font-bold py-2 px-4 rounded ${styles.buttonBackground}`}>
              변경하기
            </button>
          </div>
          {isModalOpen && <ChoiceModal onClose={closeModal} />}

          <div className="flex justify-center items-center mt-5 mb-20">
            <div className={`${styles.previewBox}`}>
              {userProfileImage && <img src={userProfileImage} alt="초기 프로필 테마" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}