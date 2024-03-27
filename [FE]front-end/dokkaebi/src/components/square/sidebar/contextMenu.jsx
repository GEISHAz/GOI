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
      <ul>
        <li onClick={onFriendDelete}>친구 삭제</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
