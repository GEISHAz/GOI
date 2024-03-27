import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './RoomEnterModal.module.css';


export default function RoomEnterModal({ onClose, roomId }) {
  const [isPassword, setIsPassword] = useState(null); // 비밀번호 상태 관리
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 비밀번호 숫자 4자리로 제한 
  const handlePasswordChange = (e) => {
    // 입력값이 숫자이고 4자리 이하인지 확인
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) { // 정규표현식을 사용하여 검증
      // 상태 업데이트 로직
      setIsPassword(value); // 상태 업데이트
    }
  };

  const handleEnter = async () => {
    try {
      // roomId 확인
      console.log('요청 전 roomId:', roomId); // 요청 전 roomId 확인

      // 서버에 POST 요청 보내기
      const response = await axios.post('https://j10d202.p.ssafy.io/api/room/enter', {
        roomId, // roomId는 RoomList에서 props로 가져옴
        password: isPassword,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('요청 후 roomId:', roomId); // 요청 후 roomId 확인

      // 응답 처리
      if (response.data.data.status === 0) {
        // 비밀번호가 맞으면, roomId에 해당하는 경로로 이동
        navigate(`/room/${room.id}`);
      } else if (response.data.data.status === 1) {
        // 비밀번호가 틀리면, 오류 메시지 표시
        alert('비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      console.error('방 입장 처리 중 오류 발생:', error);
      alert('방 입장 처리 중 오류가 발생했습니다.');
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
              placeholder="비밀번호 입력"
              maxLength={4}
              value={isPassword || ''} // 입력 상태를 value와 바인딩
              onChange={handlePasswordChange} // 입력 처리 함수를 이벤트 핸들러로 지정
              className="border-2 border-gray-300 p-1 w-48"
            />
            
            {/* 버튼 그룹 */}
            <div className="flex justify-center w-full mt-5">
            {/* 입장 버튼 */}
            <button
              onClick={handleEnter} // 입장 버튼 클릭 시 handleEnter 함수 호출
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
    