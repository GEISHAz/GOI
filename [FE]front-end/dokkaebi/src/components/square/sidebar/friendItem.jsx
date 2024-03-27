import React, { useState } from 'react';
import msgOn from '../../../images/square/mailOn.png';
import msgOff from '../../../images/square/mailOff.png';
import styles from './friendItem.module.css'; 

const FriendItem = ({ friend, onDeleteFriend, onFriendClick }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  // 우클릭
  const handleContextMenu = (e) => {
    e.preventDefault(); // 기본 우클릭 메뉴 비활성화
    setShowContextMenu(true); // 우클릭 메뉴 열기
  };

  // 친구 삭제
  const handleDeleteClick = () => {
    onDeleteFriend(friend.friendListId);
    setShowContextMenu(false); // 우클릭 메뉴 닫기
  };

  return (
    <div className={styles.friendItem} onContextMenu={handleContextMenu}> 
      <div
        onClick={() => onFriendClick(friend)}
        className={`flex justify-between ${styles.friendList}`}
      >
        <span className='ml-2'>{friend.nickName}</span>
        <img src={msgOff} alt='메세지상태' className='mr-5'/>
      </div>
      {showContextMenu && (
        <div className={`flex justify-end mb-1 ${styles.contextMenu}`}>
          <button
            onClick={handleDeleteClick}
            className={`${styles.deleteButton} text-center`}
          >
            친구 삭제
          </button>
          <button
            onClick={() => setShowContextMenu(false)}
            className={`${styles.deleteClose}`}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default FriendItem;