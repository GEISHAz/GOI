import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserNickname } from '../../features/login/authSlice';
import ChoiceModal from './choiceModal.jsx';
import styles from './kakaoLogin.module.css'
import signUp from '../../images/signUp/signUp.gif';
import blue from '../../images/signUp/blue.gif';
import brown from '../../images/signUp/brown.gif';
import green from '../../images/signUp/green.gif';

export default function KakaoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 모달에서 선택된 사진 불러오기
  const [nickname, setNickname] = useState('');
  const [isNicknameEmpty, setIsNicknameEmpty] = useState(false); // 닉네임 노입력 상태 관리
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 검사 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // 닉네임 중복검사 로직 (백에서 유효성검사 로직 다 되면 작성 예정)
  const handleCheckNickname = () => {
    // 입력 필드가 비어 있는지 검사
    if (!nickname.trim()) {
    setIsNicknameEmpty(true); // 비어있음을 true로 표시
    alert("닉네임이 입력되지 않았어요!");
    setIsNicknameChecked(false); // 중복 검사를 통과하지 않았음
    return; // 함수 실행 중단
  }

    console.log(nickname);
    setIsNicknameChecked(true);
    setIsNicknameEmpty(false);
  };

  // 닉네임 입력 여부 업데이트
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameEmpty(!e.target.value);
    setIsNicknameChecked(false); // 닉네임을 변경할 때마다 중복 검사를 다시 해야 함
    // 백에서 유효성 검사를 통과한 메세지를 받는다면 추가 로직 작성 필요
  };

  // 첫 닉네임 -> dispatch하여 store에 저장
  const handleSetInfo = () => {
    // 닉네임이 입력되지 않았다면 함수 중단
    if (!nickname) {
      setIsNicknameEmpty(true);
      alert("도깨비 이름이 설정되지 않았어요 !");
      return;
    }

    // 닉네임 중복검사를 하지 않았다면 함수 중단
    if (!isNicknameChecked) {
      alert("이름 중복을 확인해주세요 !");
      return;
    }

    // 프로필 이미지 설정하지 않았다면 함수 중단
    if (!userProfileImage) {
      alert("도깨비 이미지가 설정되지 않았어요 !")
      return;
    }

    // 닉네임과 이미지가 모두 설정된 경우에만 실행
    if (nickname && userProfileImage) {
      dispatch(setUserNickname(nickname));
      // 설정한 첫 defalut 이미지는 choiceModal에서 스토어에 저장함
      // 추가적으로 회원가입 로직 실행 가능, 예: API 호출
    } else {
      // 오류 처리, 예: 닉네임 또는 이미지 미설정 경고
    }
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
            onClick={handleSetInfo}
          />
          <div className='w-1/4 flex justify-center mt-10'>
            <img src={blue} alt="파랑도깨비" className='mt-3'/>
            <img src={brown} alt="밤색도깨비" />
            <img src={green} alt="초록도깨비" />
          </div>
        </div>

        {/* 중앙 오른쪽 */}
        <div className={`${styles.loginBG} flex flex-col justify-center w-1/3 bg-black/70 rounded-3xl p-10 mt-10`}>
          <h1 className='font-bold text-white text-left text-3xl mb-5'>도깨비 이름</h1>
          <div className="flex w-full justify-start items-center mb-5">
            <input
              type="text"
              className={`text-center bg-white ${styles.inputBackground}`}
              value={nickname}
              onChange={handleNicknameChange}
            />
          </div>
          <div className='w-full flex justify-end mb-10'>
          {isNicknameEmpty && <span className={`${styles.nicknameWarning}`}>닉네임이 입력되지 않았어요!</span>}
          {!isNicknameEmpty && isNicknameChecked && <span className={`${styles.nicknameValid}`}>사용 가능한 도깨비 이름이에요!</span>}
            <button
              className={`text-black bg-white font-bold py-2 px-4 rounded ${styles.buttonBackground}`}
              onClick={handleCheckNickname}
            >
              중복검사
            </button>
          </div>
          <h1 className='font-bold text-white text-3xl mb-5'>도깨비 설정</h1>
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