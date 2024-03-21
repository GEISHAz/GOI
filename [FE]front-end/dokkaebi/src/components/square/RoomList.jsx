import React, { useState } from 'react';
import styles from './RoomList.module.css';

import lock from '../../images/square/icon_lock.png';
import unlocked from '../../images/square/icon_unlocked.png';

export default function RoomList() {
  // 임시 방 데이터
  const [rooms] = useState([
    { isPrivate: true, roomId: '1001', hostName: 'A', capacity: '1/4' },
    { isPrivate: false, roomId: '1002', hostName: 'B', capacity: '2/4' },
    { isPrivate: true, roomId: '1003', hostName: 'C', capacity: '3/4' },
    { isPrivate: false, roomId: '1004', hostName: 'D', capacity: '4/4' },
    { isPrivate: true, roomId: '1005', hostName: 'E', capacity: '1/4' },
    { isPrivate: false, roomId: '1006', hostName: 'F', capacity: '2/4' },
    { isPrivate: true, roomId: '1007', hostName: 'G', capacity: '3/4' },
    { isPrivate: false, roomId: '1008', hostName: 'H', capacity: '4/4' },
    // 추가 방 데이터 ...
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const roomsPerPage = 4; // 한 페이지에 표시할 방의 수

  // 현재 페이지에 따라 표시할 방 계산
  const indexOfLastRoom = (currentPage + 1) * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // 페이지 변경 함수
  const nextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, Math.ceil(rooms.length / roomsPerPage) - 1));
  };

  const prevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 0));
  };

  return (
    <div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 0}>&lt;</button>
        <div className={styles.roomContainer}>
          {currentRooms.map((room, index) => (
            <div key={index} className={styles.roomBox}>
              <div className="flex items-center col-span-2 row-span-1 text-2xl">
                <img className={`${styles.lockIcon} mr-2`} src={room.isPrivate ? lock : unlocked} alt={room.isPrivate ? "Lock Icon" : "Unlock Icon"} />
                <span>{room.roomId}</span>
              </div>
              <div className="col-span-1 row-span-1"></div>
              <div className='flex flex-row justify-evenly'>
              <div className="col-span-2 row-span-1 text-xl m-2">{`${room.hostName}님의 방`}</div>
              <div className={`col-span-1 row-span-1 text-2xl m-2 ${room.capacity === '4/4' ? 'text-gray-500' : ''}`}>{room.capacity}</div>
            </div>
            </div>
          ))}
        </div>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(rooms.length / roomsPerPage) - 1}>&gt;</button>
      </div>
    </div>
  );
}
