import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoomList.module.css';
import RoomEnterModal from './RoomEnterModal';

import lock from '../../images/square/icon_lock.png';
import unlocked from '../../images/square/icon_unlocked.png';


export default function RoomList() {
  const navigate = useNavigate();

  // 방 리스트 더미 데이터
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

  // 방 클릭 핸들러 함수
  // 비밀방이라면 -> 비밀방 입장 모달 오픈
  const handleRoomClick = (room) => {
    if (room.isPrivate) {
      setEnterModal(true);
    } else {
      navigate(`/room/${room.roomId}`);
    }
  };

  // 비밀방 입장 모달 
  const [EnterModal, setEnterModal] = useState(false);

  return (
    <div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 0}>◀</button>
        <div className={styles.roomContainer}>
          {currentRooms.map((room, index) => (
            // 클릭 이벤트 핸들러
            <div 
              key={index} 
              className={styles.roomBox} 
              onClick={() => handleRoomClick(room)}>
              <div className="flex items-center col-span-2 row-span-1 text-2xl">
                <img className={`${styles.lockIcon} mr-2`} src={room.isPrivate ? lock : unlocked} alt={room.isPrivate ? "Lock Icon" : "Unlock Icon"} />
                <p className="text-Bit">{room.roomId}</p>
              </div>
              <div className="col-span-1 row-span-1"></div>
              <div className='flex flex-row justify-evenly'>
              <div className="col-span-2 row-span-1 text-xl m-2">{`${room.hostName}님의 방`}</div>
              <div className={`col-span-1 row-span-1 text-2xl m-2 text-Bit ${room.capacity === '4/4' ? 'text-red-500' : ''}`}>{room.capacity}</div>
            </div>
            </div>
          ))}
        </div>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(rooms.length / roomsPerPage) - 1}>▶</button>
      </div>

      {/* 모달 함수 전달 */}
      {EnterModal && <RoomEnterModal onClose={() => setEnterModal(false)} />}
    </div>
  );
}
