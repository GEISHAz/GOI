import React, { useState, useEffect } from 'react';
import styles from './friendAlarm.module.css'; 
import axios from 'axios';

const FriendAlarmModal = ({ onAlarmClose, onRefreshFriendList, setNewFriendRequest  }) => {
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
      onRefreshFriendList(); // 친구 목록 다시 업데이트해주기
      handleAlarmClose();
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
      alert('친구 요청을 거절했어요 !');
      onRefreshFriendList(); // 친구 목록 다시 업데이트해주기 
      handleAlarmClose();
    } catch (error) {
      console.error('거절 요청 실패:', error.response);
      alert('거절을 할 수 없어요 ! 다시 시도해보세요 !');
    }
  };

  // 알림 모달 닫는 함수
  const handleAlarmClose = () => {
    setNewFriendRequest(false);
    onAlarmClose();
  }

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
    <div className={styles.alarmBackground}>
      <div className={`overflow-y-auto ${styles.alarmContainer}`}>
        <h1 className={`flex justify-center items-center font-Bit mb-2 ${styles.alarmHeader}`}>친구 요청을 확인해보세요 !</h1>
        <div>
          {friendRequests.length > 0 ? (
            friendRequests.map((request) => (
              <div
                key={request.id}
                className={`flex flex-col justify-between mb-5 ${styles.friendConfirm}`}
              >
                <div className={`flex justify-center items-center mb-1 ${styles.friendPost}`}>
                  <span className={`text-center font-bold ${styles.fromNickName}`}>{request.fromNickName}</span>
                  <span className='text-sm ml-1'>님이 친구 요청을 보냈어요 !</span>
                </div>
                <div className='flex flex-row justify-center items-center mb-2'>
                  <button
                    className={`font-bold text-sm ${styles.okayButton}`}
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    수락
                  </button>
                  <button
                    className={`font-bold text-sm ${styles.rejectButton}`}
                    onClick={() => handleRejectRequest(request.id)}
                  >
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
          <button onClick={handleAlarmClose} className={styles.closeButton}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default FriendAlarmModal;