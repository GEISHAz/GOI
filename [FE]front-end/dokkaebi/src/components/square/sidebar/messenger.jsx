import React, { useState } from 'react';
import styles from './messenger.module.css';

const Messenger = ({ selectedFriend }) => {
  return (
    <aside className={styles.messenger}>
      <nav>
        <div>
          {/* 선택된 친구의 이름 또는 정보를 표시 */}
          <p>친구와 메신저 나눌 공간: {selectedFriend.nickName}</p>
        </div>
      </nav>
    </aside>
  );
};

export default Messenger;