// ContextMenu.jsx
import React from 'react';
import styles from './contextMenu.module.css';

const ContextMenu = ({ x, y, onClose, onFriendDelete }) => {
  const style = {
    top: y,
    left: x,
  };

  return (
    <div className={styles.contextMenu} style={style}>      
      <button
        onClick={onFriendDelete}
        className={`${styles.deleteButton} text-center`}
      >
        친구 삭제
      </button>
      <button
        onClick={onClose}
        className={`${styles.deleteClose} text-center`}
      >
        닫기
      </button>
    </div>
  );
};

export default ContextMenu;
