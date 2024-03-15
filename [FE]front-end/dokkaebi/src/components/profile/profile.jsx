import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from './profile.module.css'
import ChangeModal from './changeModal.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 회원가입에서 설정한 프로필 사진 불러오기
  const [nickname, setNickname] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 닉네임 중복검사 로직 (백에서 유효성검사 로직 다 되면 작성예정)
  const handleCheckNickname = () => {
    console.log(nickname);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-xl'
        >
          Back
        </button>
      </div>

      {/* 프로필 변경 */}
      <div className={`flex flex-col items-center justify-center mx-auto flex-grow mb-20 ${styles.profileContainer}`}>
        <div className='flex flex-row w-full'>
          {/* 왼쪽 미리보기 영역 */}
          <div className="flex flex-col items-center justify-center w-1/2 ">
            <p className="text-white mb-4 font-bold text-2xl">현재 도깨비</p>
            <div className={`${styles.previewBox} rounded-lg flex justify-center items-center`}>
              <img
                src={userProfileImage}
                alt="미리보기"
                className="max-w-full max-h-full"/>
            </div>
            <button
              onClick={handleOpenModal}
              className="mt-5 bg-white text-black font-bold p-2 rounded-lg w-1/3">
              도깨비 변경
            </button>
            {isModalOpen && <ChangeModal onClose={handleCloseModal} />}
          </div>
          
          {/* 오른쪽 닉네임 변경 영역 */}
          <div className="flex flex-col items-stretch p-5 w-1/2">
            <div className='flex flex-row justify-between mb-5'>
              <h1 className='font-bold text-white text-3xl'>닉네임</h1>
              <h1 className='font-bold text-white text-2xl'>가나다라</h1>
            </div>
            <input
              type="text"
              placeholder="닉네임 입력"
              className={`${styles.inputBackground} text-center bg-white`}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className='w-full flex justify-end mb-10'>
              <button className="mt-5 bg-white text-black font-bold p-2 rounded-lg w-20">
                변 경
              </button>
            </div>
          </div>
        </div>
        
        {/* 저장하기 영역 */}
        <div className='felx justify-center mt-20'>
          <button className="bg-white text-black font-bold p-2 rounded-lg w-20">
            저 장
          </button>
        </div>
      </div>
    </div>
  );
}