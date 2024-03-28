import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './RoomEnterModal.module.css';


export default function RoomEnterModal({ onClose, roomId }) {
  const [isPassword, setIsPassword] = useState(''); // 비밀번호 상태 관리
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const propsRoomId = roomId // props 받은 룸 ID

  // 비밀번호 숫자 4자리로 제한 
  const handlePasswordChange = (e) => {
    // 입력값이 숫자이고 4자리 이하인지 확인
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) { // 정규표현식을 사용하여 검증
      // 상태 업데이트 로직
      setIsPassword(value); // 상태 업데이트
    }
  };

  const handleEnterClick = async () => {
    try {
      // roomId 확인
      console.log('요청 전 roomId:', propsRoomId); // 요청 전 roomId 확인

      // 서버에 POST 요청 보내기
      const response = await axios.post('https://j10d202.p.ssafy.io/api/room/enter', {
        roomId: propsRoomId,
        password: isPassword,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      console.log('요청 후 roomId:', roomId); // 요청 후 roomId 확인

      // 응답 처리
      if (response.status === 200) {
        console.log('입장 성공:', response);
        // console.log('서버로부터 받은 roomId :', response.data.data.roomId);
        // console.log('서버에서 받은 status 확인 :', response.data.data.status);
  
        navigate(`/room/${roomId}`); // 해당 방으로 이동
        // navigate(`/room/${response.data.data.roomId}`); // 해당 방으로 이동
      }
    } catch (error) {
      // 에러코드에 따른 조건을 switch로 나누기
      console.log('에러 종류 확인:', error.response.data.statusCode)
      switch(error.response.data.statusCode) {
        case 423: // 방 비밀번호 틀렸을 때
        setShowRoomEnterModal(true)  
        break; // 이 break를 추가했습니다.
  
        case 426: // 방이 가득 찼을 때
          alert('방이 가득 차서 입장할 수 없어요!');
          onClose(); // 모달 닫기
          break;
  
        case 404: // 방이 존재하지 않을 때
          alert('존재하지 않는 방번호입니다!');
          onClose(); // 모달 닫기
          break;
        
        default:
          // 예외 처리
          alert('알 수 없는 오류가 발생!');
          onClose(); // 모달 닫기
          break;
      }
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
              onClick={handleEnterClick} // 입장 버튼 클릭 시 handleEnterClick 함수 호출
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
    