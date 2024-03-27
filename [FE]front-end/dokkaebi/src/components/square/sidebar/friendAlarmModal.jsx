import React, { useState, useEffect } from 'react';
import styles from './friendAdd.module.css'; 
import axios from 'axios';

const FriendAlarmModal = ({ onAlarmClose }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [friendRequests, setFriendRequests] = useState([]);

  // 요청에 대한 "수락" 함수
  const handleAcceptRequest = async (alarmId) => {
    try {
      const response = await axios.put(`https://j10d202.p.ssafy.io/api/alarm/accept/${alarmId}/invitation`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      alert('성공적으로 친구가 맺어졌어요 !');
      // 요청 목록 갱신이나 모달 닫기 등의 추가 작업
      onAlarmClose(); // 예시로 모달을 닫는 동작을 추가
    } catch (error) {
      console.error('친구 요청 수락 실패:', error.response);
      alert('수락을 할 수 없어요 ! 다시 시도해보세요 !');
    }
  };
  
  // 요청에 대한 "거절" 함수
  const handleRejectRequest = async (alarmId) => {
    try {
      const response = await axios.put(`https://j10d202.p.ssafy.io/api/alarm/reject/${alarmId}/invitation`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(response.data);
      alert('친구 요청을 거절했어요.');
      // 요청 목록 갱신이나 모달 닫기 등의 추가 작업
      onAlarmClose(); // 예시로 모달을 닫는 동작을 추가
    } catch (error) {
      console.error('거절 요청 실패:', error.response);
      alert('거절을 할 수 없어요 ! 다시 시도해보세요 !');
    }
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`https://j10d202.p.ssafy.io/api/alarm/${userId}/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setFriendRequests(response.data.data);
      } catch (error) {
        console.error('요청 목록 불러오기 실패:', error);
      }
    };

    fetchFriendRequests();
  }, [userId, accessToken]);

  return (
    <div className={styles.modalBackground}>
      <div className={`overflow-y-auto ${styles.modalContainer}`}>
        <h1 className={`flex justify-center items-center font-Bit mb-2 ${styles.friendHeader}`}>친구 요청을 확인해보세요 !</h1>
        <div>
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <div
                key={request.id}
                className={`flex justify-between mb-5 ${styles.friendConfirm}`}
              >
                <div className={`flex justify-center ${styles.friendPost}`}>
                  <span className={styles.fromNickName}>{request.fromNickName}</span>
                  님이 친구 요청을 보냈어요.
                </div>
                <div className='flex justify-end'>
                  <button className={`font-bold ${styles.okayButton}`} onClick={() => handleAcceptRequest(request.id)}>
                    수락
                  </button>
                  <button className={`font-bold ${styles.rejectButton}`} onClick={() => handleRejectRequest(request.id)}>
                    거절
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={`flex justify-center font-bold mb-5 ${styles.nothingFriend}`}>새로운 친구 요청이 아직 없어요 !</div>
          )}
        </div>
        <div className='flex justify-center mb-2'>
          <button onClick={onAlarmClose} className={styles.closeButton}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default FriendAlarmModal;