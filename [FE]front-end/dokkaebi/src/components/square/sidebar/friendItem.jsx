import React, { useState } from 'react';
// import msgOn from '../../../images/square/mailOn.png';
import msgOff from '../../../images/square/mailOff.png';
import styles from './friendItem.module.css'; 

const FriendItem = ({ friend, onDeleteFriend, onFriendClick, newMessageCount }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isOpenMessenger, setIsOpenMessnger] = useState(false);

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

  // 메시지 읽음 처리
  const handleMessageRead = () => {
    onFriendClick(friend); // 메신저 열기
  };

  return (
    <div className={styles.friendItem} onContextMenu={handleContextMenu}> 
      <div
        onClick={handleMessageRead}
        className={`flex justify-between mr-3 ${styles.friendList}`}
      >
        <span className='ml-2'>{friend.nickName}</span>
        {/* 메세지 수 띄우기 -> 누르면 읽음 처리하고 0으로 처리 -> 0이라면 msgOff 이미지 표기*/}
        {newMessageCount > 0 ? (
          <span className={styles.newMessageCount}>{newMessageCount}</span>
        ) : (
          <img src={msgOff} alt='메세지온거없음' className={styles.messageIcon}/>
        )}
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