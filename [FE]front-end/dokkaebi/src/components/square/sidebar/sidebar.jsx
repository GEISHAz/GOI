import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Messenger from './messenger.jsx'
import FriendAddModal from './friendAddModal.jsx';
import FriendAlarm from './friendAlarmModal.jsx';
import styles from './sidebar.module.css';
import msgOn from '../../../images/square/mailOn.png';
import msgOff from '../../../images/square/mailOff.png';

const Sidebar = ({ toggleSidebar }) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFriendList, setIsFriendList] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true); // 음악 멈춤 안내 문구
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false); // 친구 추가 모달 관리
  const [isFriendAlarm, setIsFriendAlarm] = useState(false); // 친구 요청 알림관리
  
  const handleFriendClick = (friend) => {
    setSelectedFriend(friend); // 선택된 친구 상태 업데이트
  };

  // 메신저 닫기 함수
  const toggleMessageBar = () => {
    setSelectedFriend(null); // 선택된 친구 상태를 null로 설정하여 메신저를 닫음
  };


  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const res = await axios.get(`https://j10d202.p.ssafy.io/api/friend/${userId}/list`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("친구 목록 불러오기 :", res)
        if (res.status === 200 && res.data.data) {
          console.log("메세지 확인 :", res.data.msg);
          const friends = res.data.data.map(friend => ({
            id: friend.friendId,
            nickName: friend.nickName,
            friendListId: friend.friendListId,
          }));
          setIsFriendList(friends);
          // setIsFriendList(res.data.data)
        } else {
          throw new Error('에러 발생');
        }
      } catch (error) {
        console.error('친구 목록 불러오기 실패', error);
      }
    };

    fetchFriendList();
  }, [])

  // 친구 추가 모달 열기
  const openAddFriendModal = () => {setIsAddFriendModalOpen(true);};

  // 친구 추가 모달 닫기
  const closeAddFriendModal = () => {setIsAddFriendModalOpen(false);};

  // 친구 요청 알림 모달 열기
  const openAlarmModal = () => {setIsFriendAlarm(true)}

  // 친구 요청 알림 모달 닫기
  const closeAlarmModal = () => {setIsFriendAlarm(false)}

  return (
    <aside className={styles.sidebar}>
      {/* 사이드바 내용 */}
      <nav>
        <div className={`flex flex-row p-4 ${styles.menuBox}`}>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`} onClick={openAddFriendModal}>친구 추가</button>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`} onClick={openAlarmModal}>알림</button>
        </div>
      </nav>

      {/* 친구 목록 */}
      <nav>
        <div className={`flex flex-col items-center overflow-y-auto ${styles.friendContianer}`}>
          <div className='w-full'>
            {isFriendList.map((user, index) => {
              return (
                <div 
                  key={index}
                  className={styles.friendList}
                  onClick={() => handleFriendClick(user)}
                >
                  <span className='font-bold ml-5'>{user.nickName}</span>
                  <img src={msgOff} alt='메세지상태' className='mr-5'/>
                </div>
              )
            })}
          </div>
        </div>
      </nav>

      <nav>
        <div className='flex justify-start p-10'>
          {showPrompt && <div className={`w-full text-center font-bold mt-2 ${styles.musicPrompt}`}>음악이 잠시 멈춥니다 !</div>}
          <button
            onClick={toggleSidebar}
            className={`text-2xl font-bold text-white text-center ${styles.closeButton}`}
          >
            닫기
          </button>
        </div>
      </nav>

      {/* 친구 메신저 열기 */}
      {selectedFriend && <Messenger selectedFriend={selectedFriend} toggleMessageBar={toggleMessageBar} />}

      {/* 친구 추가 모달 열기 */}
      {isAddFriendModalOpen && <FriendAddModal onClose={closeAddFriendModal} />}

      {/* 친구 요청 알림 모달 열기 */}
      {isFriendAlarm && <FriendAlarm onAlarmClose={closeAlarmModal} />}
    </aside>
  );
};

export default Sidebar;
