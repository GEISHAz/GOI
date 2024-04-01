import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './friendAdd.module.css'; 
import { setAlarmId } from '../../../features/addFriend/addFriendSlice.js';
import axios from 'axios';

const FriendAddModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddFriend = async () => {
    try {
      const response = await axios.post(`https://j10d202.p.ssafy.io/api/alarm/send/invitation`, {
        id: userId,
        friendNickName: searchTerm,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log("친구 요청 데이터 확인 :", response.data); // 응답 로그 출력
      console.log("친구 요청에 대한 alarmId 확인 :", response.data.alarmId) // 
      dispatch(setAlarmId(response.data.alarmId)); // alarmId 리덕스 스토어에 저장
      alert('친구 요청을 성공적으로 보냈어요 !');
      onClose(); // 모달 닫기
    } catch (error) {
      console.log(error)
      let errorMessage = '연결에 문제가 있어요 ! 다시 시도해주세요 !';
      // 백엔드에서 에러 메시지가 있는 경우, 그 메시지(msg)를 사용자에게 표시
      if (error.response && error.response.data && error.response.data.msg) {
        errorMessage = error.response.data.msg;
      }
      alert(errorMessage);
    }
  };

  return (
    <div className={styles.friendBackground}>
      <div className={styles.friendContainer}>
        <h1 className={`flex justify-center items-center font-Bit mb-2 ${styles.friendHeader}`}>도깨비 친구를 추가해보세요 !</h1>
          <input
            type="text"
            placeholder="추가할 유저를 입력 후 요청을 보내세요 !"
            maxLength={14}
            value={searchTerm}
            onChange={handleSearchChange}
            className={`mb-1 ml-2 text-md ${styles.searchInput}`}
          />
        <div className='flex justify-end mb-5'>
          <button onClick={handleAddFriend} className={styles.friendAdd}>친구 요청</button>
        </div>
        <div className='flex justify-center mb-2'>
          <button onClick={onClose} className={styles.closeButton}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default FriendAddModal;