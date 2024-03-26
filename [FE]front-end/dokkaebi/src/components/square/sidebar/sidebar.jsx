import React, { useState } from 'react';
import Messenger from './messenger.jsx'
import styles from './sidebar.module.css';
import msgOn from '../../../images/square/mailOn.png';
import msgOff from '../../../images/square/mailOff.png';

const Sidebar = ({ toggleSidebar }) => {

  const [selectedFriend, setSelectedFriend] = useState(null);

  const dummy = [
    { id: 1, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 2, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 3, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 4, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 5, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 7, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 8, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 9, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 10, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 11, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 12, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 13, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 14, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 15, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
    { id: 16, nickName: "민호짱짱123", friendListId: 1, friendId: 1},
  ];

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend); // 선택된 친구 상태 업데이트
  };

  return (
    <aside className={styles.sidebar}>
      {/* 사이드바 내용 */}
      <nav>
        <div className={`flex flex-row p-4 ${styles.menuBox}`}>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`}>친구 추가</button>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`}>알림</button>
        </div>
      </nav>

      {/* 친구 목록 */}
      <nav>
        <div className={`flex flex-col items-center overflow-y-auto ${styles.friendContianer}`}>
          <div className='w-full'>
            {dummy.map((user, index) => {
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
          <button
            onClick={toggleSidebar}
            className={`text-2xl font-bold text-white text-center ${styles.closeButton}`}
          >
            닫기
          </button>
        </div>
      </nav>

      {/* 친구 메신저 열기 */}
      {selectedFriend && <Messenger selectedFriend={selectedFriend} />}
    </aside>
  );
};

export default Sidebar;
