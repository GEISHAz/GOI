import React from 'react';
import styles from './UserList.module.css';

export default function UserList() {

  return (
    // "접속 중인 유저" 컨테이너
    <div className={styles.userContainer}>
      <h1 className="font-Bit text-white text-2xl text-center m-4">접속 중인 유저</h1>

      {/* 유저 상태 표시 (게임 중/대기 중) 리스트 */}
      <div className={`text-center ${styles.userState}`}>
        프로필 / 닉네임 / 상태
        <br></br>
        지금은 더미
      </div>
    </div>
  );
};