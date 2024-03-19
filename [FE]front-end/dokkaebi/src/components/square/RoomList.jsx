import React from 'react';
import styles from './RoomList.module.css';

import lock from '../../images/square/icon_lock.png';
import unlocked from '../../images/square/icon_unlocked.png';

export default function UserList() {
  // 추가해야할 기능
  // 방 정보 받아와야 함 (비밀방 여부/ 방번호/ 방장 닉네임/ 인원수)
  // 비밀방 여부에 따라 자물쇠 icon -> lock/unlocked
  // 인원수에 따라 4/4 인원 채워졌으면 -> 글자 색 변경으로 disabled 


  return (
    // "방 목록" 컨테이너
    <div className={styles.roomContainer}>
    
      {/* 방 정보 표시 그리드 컨테이너 */}
      <div className={`${styles.roomBox} grid grid-cols-3 grid-rows-2 gap-5 p-5`}>

        <div className="flex items-center col-span-2 row-span-1 text-2xl">
          <img className={`${styles.lockIcon} mr-2`} src={lock} alt="Lock Icon" />
          <span>방번호</span>
        </div>
        <div className="col-span-1 row-span-1"></div>
        <div className="col-span-2 row-span-1 text-xl">닉네임님의 방</div>
        <div className="col-span-1 row-span-1 text-2xl">3/4</div>

      </div>
    </div>
  );
};