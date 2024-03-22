import React, { useState } from 'react';
import styles from './RoomCreateModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import lock from '../../images/square/icon_lock.png';
import unlocked from '../../images/square/icon_unlocked.png';
import { setRoomTitle, setRoomPassword, setRoomYears } from '../../features/square/roomSlice.js';
import RangeSlider from './RangeSlider.jsx';

export default function RoomCreateModal({ onClose, userName }) {
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.auth.userNickname); // 회원가입에서 설정한 닉네임 불러오기
  const [isRoomTitle, setIsRoomTitle] = useState(''); // 방 제목 상태 관리
  const [isPrivate, setIsPrivate] = useState(false); // 비공개 체크박스의 상태를 위한 훅
  const [ispassword, setIsPassword] = useState(null); // 비밀번호 상태 관리
  const [isyears, setIsyears] = useState(); // 연도 상태 관리

  const handlePrivateChange = (e) => { // 체크박스 상태 변경 함수
    setIsPrivate(e.target.checked);
  };

  // 비밀번호 숫자 4자리로 제한 
  const handlePasswordChange = (e) => {
    // 입력값이 숫자이고 4자리 이하인지 확인
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) { // 정규표현식을 사용하여 검증
      // 상태 업데이트 로직
      setIsPassword(value); // 상태 업데이트
    }
  };

  // "생성" 버튼 기능 
  const handleCreateRoom = () => {
    // 방 제목을 입력하지 않았을 경우
    if (!isRoomTitle) {
      alert("방 제목을 설정해주세요 !");
      return // 함수 중단
    }

    // 비공개 체크는 했으나 비밀번호를 입력하지 않았을 경우
    if (isPrivate && !ispassword) {
      alert("비밀번호를 설정하지 않았어요 !")
      return // 함수 중단
    }

    // 사용자가 "생성" 버튼을 눌러서 방을 만들면, 스토어에 그 정보들을 저장하겠다
    // 그 정보라 하면은, 사용자가 설정한 방제목, 방비밀번호, 연도 3가지

    if (isRoomTitle && ispassword && isyears) {
      dispatch(setRoomTitle(isRoomTitle))
      dispatch(setRoomPassword(ispassword))
      dispatch(setRoomYears(isyears))
    } else {
      alert("방 설정이 제대로 이루어지지 않았어요 !");
    }
  }

  return (
    <div className={styles.background}>
      {/* 모달 컨테이너 */}
      <div className={`${styles.container} flex flex-col items-center justify-center`}>
        
        {/* 모달 타이틀 */}
        <h1 className="font-Bit text-4xl mb-10">방 만들기</h1>

        {/* 방 만들기 인풋 그리드 */}
        <div className="grid grid-cols-2 grid-rows-4 gap-2 w-full mb-4 mr-40">
            
          {/* 방 번호 */}
          {/* 방 번호 생성창에서는 보여줄 필요 없으므로 일단 주석 처리 */}
          {/* <div className="flex justify-end items-center">
            <label htmlFor="roomNumber" className="text-2xl mr-2">방 번호</label>
          </div>
          <div>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value="1001"
              disabled
              className="border-2 border-gray-300 p-1"
            />
          </div> */}

          {/* 방 제목 */}
          <div className="flex justify-end items-center">
            <label htmlFor="roomTitle" className="text-2xl mr-2">방 제목</label>
          </div>
          <div>
            <input
              type="text"
              value={isRoomTitle}
              className="border-2 border-gray-300 p-1"
              maxLength={15}
              onChange={(e) => setIsRoomTitle(e.target.value)}
            />
          </div>

          {/* 비공개 */}
          <div className="flex justify-end items-center">
            
            <label htmlFor="roomPrivate" className="text-2xl mr-2">비공개</label>
          </div>
          <div className="flex items-center">
          <img src={isPrivate ? lock : unlocked} alt={isPrivate ? "Locked" : "Unlocked"} className="w-10 h-auto mr-2" />
            <input
              type="checkbox"
              id="roomPrivate"
              name="roomPrivate"
              className="mr-2"
              onChange={handlePrivateChange}
            />
            
            {isPrivate && (
              <input
                type="text"
                id="roomPassword"
                name="roomPassword"
                placeholder="비밀번호 입력"
                maxLength={4}
                value={ispassword} // 입력 상태와 바인딩
                onChange={handlePasswordChange} // 입력 처리 함수
                className="border-2 border-gray-300 p-1 w-32"
              />
            )}
          </div>

          {/* 연도 선택 */}
          <div className="flex justify-end items-center">
            <label htmlFor="roomNumber" className="text-2xl mr-2">연도 선택</label>
          </div>
          <RangeSlider />
          </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-center w-full mt-5">
          {/* 확인 버튼 */}
          <button
            className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCreateRoom}
          >
            생성
          </button>

          {/* 취소 버튼 */}
          <button
            onClick={onClose}
            className="w-24 h-12 bg-red-500 hover:bg-red-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
