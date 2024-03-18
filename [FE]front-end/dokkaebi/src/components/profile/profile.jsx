import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css'
import ChangeModal from './changeModal.jsx';
import { setUserNickname, setUserProfileImage } from '../../features/login/authSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 회원가입에서 설정한 프로필 사진 불러오기
  const userNickname = useSelector((state) => state.auth.userNickname); // 회원가입에서 설정한 닉네임 불러오기
  const [nickname, setNickname] = useState(userNickname); // 현재 닉네임
  const [previousNickname, setPreviousNickname] = useState(''); // 이전 닉네임
  const [isNicknameEmpty, setIsNicknameEmpty] = useState(false); // 닉네임 노입력 상태 관리
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 검사 상태 관리
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 정규식 검사 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNicknameChange = async () => {
    if (nickname.trim().length === 0) {
      setIsNicknameEmpty(true);
      setIsNicknameValid(true); // 공백 상태로 받았을 때 정규식 메세지 받지 않기 위해 true로 설정
      setIsNicknameChecked(false); // 닉네임이 비어있으면 중복 검사를 통과하지 않았다고 설정
      alert("공백으로 이름을 설정할 수 없어요 !");
      return;
    } else {
      setIsNicknameEmpty(false);
    }

    // 닉네임의 유효성 검사 실행
    const isValid = await checkNicknameValidity(nickname);
    if (!isValid) {
      setIsNicknameValid(false); // 닉네임이 유효하지 않음
      setIsNicknameChecked(false); // 닉네임이 유효하지 않으면 중복 검사도 통과하지 않았다고 설정
      return; // 유효하지 않으면 함수 중단
    } else {
      setIsNicknameValid(true); // 유효성 검사 통과
      setIsNicknameChecked(true); // 닉네임 검사 통과
      setPreviousNickname(userNickname); // 변경하기 전 닉네임을 한번 저장
      dispatch(setUserNickname(nickname)); // 업데이트한 닉네임을 스토어에 새로 업데이트, 이미지는 changeModal에서 업데이트
      alert("도깨비 이름이 변경되었어요 !");
    }
  };


  // 정규식 조건을 만족하는지 확인
  const checkNicknameValidity = async (nickname) => {
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

    if (!regex.test(nickname)) {
      alert("닉네임은 2자 이상 10자 이하의 한글, 영어, 숫자만 사용할 수 있어요!");
      return false;
    }

    // 예시로, 모든 닉네임을 유효하다고 가정
    // 실제로는 서버로부터 응답을 받아 중복 여부를 검사 (백 API요청 로직 필요)
    return true;
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

      {/* 프로필 변경 컨테이너 */}
      <div className={`flex flex-col items-center justify-center mx-auto flex-grow mb-20 ${styles.profileContainer}`}>
        {/* 헤더 */}
        <div className='text-white font-bold text-3xl mb-5'>
          <h1>도깨비 신상을 바꾸어보세요 ! </h1>
        </div>
        <div className='flex flex-row w-full'>
          {/* 왼쪽 미리보기 영역 */}
          <div className="flex flex-col items-center justify-center w-1/2 ">
            <h1 className="text-white mb-4 font-bold text-2xl">현재 도깨비</h1>
            <div className={`${styles.previewBox} rounded-lg flex justify-center items-center`}>
              <img
                src={userProfileImage}
                alt="미리보기"
                className="w-40"/>
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
              <h1 className='font-bold text-white text-2xl'>도깨비 이름</h1>
              <h1 className='font-bold text-white text-xl'>
                {previousNickname ? `Prev. ${previousNickname}` : "이전 도깨비 이름"}
              </h1>
            </div>
            <input
              type="text"
              placeholder="닉네임 입력"
              value={nickname}
              className={`${styles.inputBackground} text-center bg-white`}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className='w-full flex justify-end mt-5'>
              <div className='flex justify-center items-center mr-2'>
                {isNicknameEmpty && <span className={`${styles.nicknameWarning}`}>이름이 입력되지 않았어요 !</span>}
                {!isNicknameEmpty && isNicknameChecked && <span className={`${styles.nicknameOkay}`}>도깨비 이름을 변경했어요 !</span>}
                {!isNicknameValid && <span className={`${styles.nicknameValid}`}>이름은 2자~10자까지 한글, 영어, 숫자만 !</span>}
              </div>
              <button
                onClick={handleNicknameChange}
                className="bg-white text-black font-bold p-2 rounded-lg w-20">
                변 경
              </button>
            </div>
          </div>
        </div>
        
        {/* 저장하기 영역 */}
        <div className='felx justify-center mt-10'>
          <button className="bg-white text-black font-bold p-2 rounded-lg w-20">
            저 장
          </button>
        </div>
      </div>
    </div>
  );
}