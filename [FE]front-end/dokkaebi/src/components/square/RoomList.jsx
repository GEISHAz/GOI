import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RoomList.module.css";
import RoomEnterModal from "./RoomEnterModal";

import lock from "../../images/square/icon_lock.png";
import unlocked from "../../images/square/icon_unlocked.png";

export default function RoomList() {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const channelId = sessionStorage.getItem("channelId");
  const [isRoomsInfo, setIsRoomsInfo] = useState([]); // 방 정보 상태
  const [totalRoomCount, setTotalRoomCount] = useState(0); // 서버에 있는 총 방 개수 관리할 상태

  const [currentPage, setCurrentPage] = useState(0);
  const roomsPerPage = 4; // 한 페이지에 표시할 방의 수
  const [EnterModal, setEnterModal] = useState(false); // 비밀방 입장 모달

  // 현재 페이지에 따라 표시할 방 계산
  const indexOfLastRoom = (currentPage + 1) * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = isRoomsInfo.slice(indexOfFirstRoom, indexOfLastRoom);

  // 페이지 변경 함수
  const nextPage = () => {
    setCurrentPage((currentPage) =>
      Math.min(
        currentPage + 1,
        Math.ceil(isRoomsInfo.length / roomsPerPage) - 1
      )
    );
  };

  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 0));
  };

  // 방 클릭 핸들러 함수
  // 비밀방이라면 -> 비밀방 입장 모달 오픈
  const handleRoomClick = (room) => {
    if (room.isPrivate) {
      setEnterModal(true);
    } else {
      axios
        .post(`https://j10d202.p.ssafy.io/api/room/enter/${room.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          console.log("방 접속 성공");
          sessionStorage.setItem("roomId", room.id);
          navigate(`/room/${room.id}`);
        })
        .catch((err) => {
          console.log(err);
          console.log("방 접속 실패");
        });
    }
  };

  // 서버에서 방 목록을 받아오는 함수
  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const response = await axios.get(
          `https://j10d202.p.ssafy.io/api/square/list/${channelId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log("방 목록 Info 확인 :", response);
        if (response.status === 200 && response.data.data) {
          setIsRoomsInfo(response.data.data.list || []); // 받아온 방 목록으로 상태 업데이트
          setTotalRoomCount(response.data.data.totalRoomCount || 0); // 총 방 개수로 상태 업데이트
        } else {
          throw new Error("에러입니다");
        }
      } catch (error) {
        console.error("방 목록 불러오기 실패", error);
      }
    };
    fetchRoomList();
  }, []); // 의존성 배열이 빈 배열이므로, 컴포넌트가 마운트될 때 한 번만 호출됨

  return (
    <div>
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 0}>
          ◀
        </button>
        <div className={styles.roomContainer}>
          {currentRooms.map((room, index) => (
            // 클릭 이벤트 핸들러
            <div
              key={index}
              className={styles.roomBox}
              onClick={() => handleRoomClick(room)}
            >
              <div className="flex items-center col-span-2 row-span-1 text-2xl">
                <img
                  className={`${styles.lockIcon} mr-2`}
                  src={room.isPrivate ? lock : unlocked}
                  alt={room.isPrivate ? "Lock Icon" : "Unlocked Icon"}
                />
                <p className="text-Bit">{room.id}</p>
              </div>
              <div className="col-span-1 row-span-1"></div>
              <div className="flex flex-row justify-evenly">
                <div className="col-span-2 row-span-1 text-xl m-2">{`${room.title}`}</div>
                <div
                  className={`col-span-1 row-span-1 text-2xl m-2 text-Bit ${
                    room.userCount === 4 ? "text-red-500" : ""
                  }`}
                >
                  {room.userCount}/4
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(totalRoomCount / roomsPerPage) - 1
          }
        >
          ▶
        </button>
      </div>

      {/* 모달 함수 전달 */}
      {EnterModal && <RoomEnterModal onClose={() => setEnterModal(false)} />}
    </div>
  );
}
