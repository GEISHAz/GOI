import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './RoomSearchModal.module.css';


export default function RoomSearchModal({ onClose }) {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  
  // 입력창에 입력된 방 번호를 관리하는 상태
  const [roomId, setRoomId] = useState('');

  // 방 번호 입력 이벤트 핸들러
  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  // 입장 버튼 클릭 핸들러
  const handleEnterClick = async () => {
    try {
      const response = await axios.post(`https://j10d202.p.ssafy.io/api/square/find/${roomId}`, {
    }, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      console.log('입장 성공:', response);
      console.log('서버로부터 받은 roomId:', response.data.roomId);
      navigate(`/room/${roomId}`); // 방 번호에 해당하는 페이지로 이동
    } else {
      throw new Error('입장 실패');
    }
  } catch (error) {
    console.error('입장 처리 중 오류 발생:', error);
    alert('입장 처리 중 오류가 발생했습니다');
  }
};


    return (
        <div className={styles.background}>
          {/* 모달 컨테이너 */}
          <div className={`${styles.container} flex flex-col items-center justify-center`}>
            {/* 모달 타이틀 */}
            <h1 className="font-Bit text-5xl mb-10">방 찾기</h1>
            <input
              type="number"
              value={roomId}
              onChange={handleRoomIdChange} // 입력 변화를 처리하는 함수 연결
              placeholder="방 번호 입력"
              className="border-2 border-gray-300 p-1 w-48"
            />
            
            {/* 버튼 그룹 */}
            <div className="flex justify-center w-full mt-5">
            {/* 입장 버튼 */}
            <button
              onClick={handleEnterClick} // 클릭 이벤트 핸들러 연결
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
