import React, { useState } from 'react';
import styles from './RoomEnterModal.module.css';


export default function RoomEnterModal({ onClose }) {
  const [ispassword, setIsPassword] = useState(null); // 비밀번호 상태 관리

  // 비밀번호 숫자 4자리로 제한 
  const handlePasswordChange = (e) => {
    // 입력값이 숫자이고 4자리 이하인지 확인
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) { // 정규표현식을 사용하여 검증
      // 상태 업데이트 로직
      setIsPassword(value); // 상태 업데이트
    }
  };

    return (
        <div className={styles.background}>
          {/* 모달 컨테이너 */}
          <div className={`${styles.container} flex flex-col items-center justify-center`}>
            {/* 모달 타이틀 */}
            <h1 className="font-Bit text-5xl mb-10">비밀방 입장</h1>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              placeholder="비밀번호 입력"
              maxLength={4}
              value={ispassword || ''} // 입력 상태를 value와 바인딩
              onChange={handlePasswordChange} // 입력 처리 함수를 이벤트 핸들러로 지정
              className="border-2 border-gray-300 p-1 w-48"
            />
            
            {/* 버튼 그룹 */}
            <div className="flex justify-center w-full mt-5">
            {/* 확인 버튼 */}
            <button
              className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="button"
            >
            입장
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
    