import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setRoomNum } from "../../features/square/roomSlice";
import axios from "axios";
import styles from "./RoomList.module.css";
import RoomEnterModal from "./RoomEnterModal";
import lock from "../../images/square/icon_lock.png";
import unlocked from "../../images/square/icon_unlocked.png";
import { useDispatch } from "react-redux";

export default function RoomList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const channelId = sessionStorage.getItem("channelId");
  const [isRoomsInfo, setIsRoomsInfo] = useState([]); // 방 정보 상태
  const [totalRoomCount, setTotalRoomCount] = useState(0); // 서버에 있는 총 방 개수 관리할 상태

  const [currentPage, setCurrentPage] = useState(0);
  const roomsPerPage = 4; // 한 페이지에 표시할 방의 수
  const [EnterModal, setEnterModal] = useState(false); // 비밀방 입장 모달
  const [roomId, useRoomId] = useState();

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
    // useRoomId(room.id);
    console.log("비공개 상태 확인 :", room.isPrivate);
    if (room.isPrivate) {
      console.log("roomId 확인 111:", room.id);
      const roomId = room.id
      useRoomId(roomId)
      setEnterModal(true);
    } else {
      console.log("roomId 확인 222:", room.id);
      axios
        .post(
          `https://j10d202.p.ssafy.io/api/room/enter`,
          { roomId: room.id, password: "" },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("방 접속 성공");
          dispatch(setRoomNum(response.data.roomNum));
          sessionStorage.setItem("roomId", room.id);
          navigate(`/room/${room.id}`, {
            state: JSON.parse(JSON.stringify({ response })),
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("방 접속 실패");
        });
      // sessionStorage.setItem("roomId", room.id);
      // navigate(`/room/${room.id}`);
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
    // 새로고침 이벤트 리스너 추가
    const handleRefresh = () => {
      console.log("방목록 새로고침 확인");
      fetchRoomList();
    };

    window.addEventListener("refreshRoomList", handleRefresh);

    // 첫 로딩 시에도 데이터를 불러옴
    fetchRoomList();

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("refreshRoomList", handleRefresh);
    };
  }, []); // 의존성 배열이 빈 배열이므로 -> 컴포넌트가 마운트될 때 한 번만 호출

  return (
    <div className={styles.roomContainer}>
      {/* 왼쪽 페이지네이션 버튼 */}
      <div className={styles.prevPagination}>
        <button
          className="w-12 flex items-center justify-center text-white cursor-pointer text-2xl"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          ◀
        </button>
      </div>
      {/* ROOM 리스트 */}
      <div
        className={`${styles.roomListContainer} ${
          currentRooms.length === 0 ? styles.defaultRoom : ""
        }`}
      >
        {currentRooms.length > 0 ? (
          currentRooms.map((room, index) => (
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
                <p className="text-Bit">{room.roomNum}</p>
              </div>
              <div className="col-span-1 row-span-1"></div>
              <div className="flex flex-row justify-evenly">
                <div className="col-span-2 row-span-1 text-lg m-2">{`${room.title}`}</div>
                <div
                  className={`col-span-1 row-span-1 text-2xl m-2 text-Bit ${
                    room.userCount === 4 ? "text-red-400" : ""
                  }`}
                >
                  {room.userCount}/4
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`flex justify-center items-center my-auto ${styles.defaultRoom}`}
          >
            <h1 className="text-white text-2xl font-Galmuri11 font-bold opacity-100">
              아직 방이 없어요 ! 방을 만들어보세요 !
            </h1>
          </div>
        )}
      </div>
      {/* 오른쪽 페이지네이션 버튼 */}
      <div className={styles.nextPagination}>
        <button
          className="w-12 flex items-center justify-center text-white cursor-pointer text-2xl"
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(totalRoomCount / roomsPerPage) - 1
          }
        >
          ▶
        </button>
      </div>

      {/* 모달 함수 전달 */}
      {EnterModal && (
        <RoomEnterModal onClose={() => setEnterModal(false)} roomId={roomId} />
      )}
    </div>
  );
}
