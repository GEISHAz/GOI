import React, { useState } from 'react';
import styles from './RoomList.module.css';

import lock from '../../images/square/icon_lock.png';
import unlocked from '../../images/square/icon_unlocked.png';

export default function RoomList() {
  // 임시 방 데이터
  const [rooms] = useState([
    { isPrivate: true, roomId: '101', hostName: 'A', capacity: '1/4' },
    { isPrivate: false, roomId: '102', hostName: 'B', capacity: '2/4' },
    { isPrivate: true, roomId: '103', hostName: 'C', capacity: '3/4' },
    { isPrivate: false, roomId: '104', hostName: 'D', capacity: '4/4' },
    { isPrivate: true, roomId: '105', hostName: 'E', capacity: '1/4' },
    { isPrivate: false, roomId: '106', hostName: 'F', capacity: '2/4' },
    { isPrivate: true, roomId: '107', hostName: 'G', capacity: '3/4' },
    { isPrivate: false, roomId: '108', hostName: 'H', capacity: '4/4' },
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './RoomList.module.css';

// import lock from '../../images/square/icon_lock.png';
// import unlocked from '../../images/square/icon_unlocked.png';

// export default function RoomList() {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     fetchRooms().then(data => setRooms(data));
//   }, []);

//   // axios를 사용하여 데이터 가져오기
//   async function fetchRooms() {
//     try {
//       const response = await axios.get('여기에_방_정보를_가져올_URL_입력');
//       return response.data; // 이 부분은 백엔드에서 받는 데이터 구조에 따라 조정해야 할 수 있습니다.
//     } catch (error) {
//       console.error("방 정보를 가져오는데 실패했습니다:", error);
//       return []; // 오류가 발생했을 때 빈 배열 반환
//     }
//   }

//   return (
//     <div className={`${styles.roomContainer} overflow-auto`}>
//       {rooms.map((room, index) => (
//         <div key={index} className={`${styles.roomBox} grid grid-cols-3 grid-rows-2 gap-5 p-5`}>
//           <div className="flex items-center col-span-2 row-span-1 text-2xl">
//             <img className={`${styles.lockIcon} mr-2`} src={room.isPrivate ? lock : unlocked} alt={room.isPrivate ? "잠금 아이콘" : "잠금 해제 아이콘"} />
//             <span>{`방번호: ${room.roomId}`}</span>
//           </div>
//           <div className="col-span-2 row-span-1 text-xl">{`${room.hostName}님의 방`}</div>
//           <div className={`col-span-1 row-span-1 text-2xl ${room.currentCapacity === "4/4" ? 'text-gray-500' : ''}`}>{room.currentCapacity}</div>
//         </div>
//       ))}
//     </div>
//   );
// };
