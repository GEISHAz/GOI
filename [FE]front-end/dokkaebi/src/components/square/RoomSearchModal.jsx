import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RoomEnterModal from "./RoomEnterModal";
import styles from "./RoomSearchModal.module.css";
import { useDispatch } from "react-redux";

export default function RoomSearchModal({ onClose }) {
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [isReceiveRoomId, setIsReceiveRoomId] = useState(null);
  const [isErrorRoomId, setIsErrorRoomId] = useState(null);

  // 입력창에 입력된 방 번호를 관리하는 상태
  const [roomNum, setRoomNum] = useState("");

  // 비밀방이라면 -> 입력창에 입력된 비밀번호 관리
  const [password, setPassword] = useState("");

  // 비밀방 입장 모달 표시 상태
  const [showRoomEnterModal, setShowRoomEnterModal] = useState(false);

  // 방 번호 입력 이벤트 핸들러
  const handleRoomNumChange = (e) => {
    setRoomNum(e.target.value);
  };
  let retryCount = 0;
  const MAX_RETRY_COUNT = 5;

  const handleEnterClick = () => {
    // if (retryCount >= MAX_RETRY_COUNT) {
    //   alert('비밀번호 입력 횟수를 초과했습니다.');
    //   onClose();
    //   return;
    // }
    axios
      .post(
        "https://j10d202.p.ssafy.io/api/room/enter",
        {
          roomNum: roomNum,
          password: password,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("방검색 리스폰스 확인:", response);
        console.log("roomId 확인:", response.data[0].roomId);
        sessionStorage.setItem("roomId", response.data[0].roomId);
        dispatch(setRoomNum(roomNum));
        setIsReceiveRoomId(response.data[0].roomId);
        console.log("입장 성공:", response);
        navigate(`/room/${response.data[0].roomId}`, {
          state: JSON.parse(JSON.stringify({ response })),
        });
      })
      .catch((error) => {
        console.log("입장 실패:", error);
        // console.log("입장 실패했을 때 roomId 확인 :", roomId)
        if (!error.response) {
          alert("알 수 없는 오류가 발생했습니다.");
          onClose();
          return;
        }
        // switch (error.response.data.statusCode && error.response.data.roomId) {
        switch (error.response.data.statusCode) {
          case 423: // 방 비밀번호 틀렸을 때
            console.log('roomId @@@@@@@@@ :', error.response.data.roomId)
            setIsErrorRoomId(error.response.data.roomId)
            sessionStorage.setItem("roomId", error.response.data.roomId)
            setShowRoomEnterModal(true)
            // retryCount++;
            break; // 이 break를 추가했습니다.

          case 426: // 방이 가득 찼을 때
            alert("방이 가득 차서 입장할 수 없어요!");
            onClose(); // 모달 닫기
            break;

          case 404: // 방이 존재하지 않을 때
            alert("존재하지 않는 방번호입니다!");
            onClose(); // 모달 닫기
            break;

          default:
            // 예외 처리
            alert("알 수 없는 오류가 발생!");
            onClose(); // 모달 닫기
            break;
        }
      });
  };

  return (
    <div className={styles.background}>
      {/* 모달 컨테이너 */}
      <div
        className={`${styles.container} flex flex-col items-center justify-center`}
      >
        {/* 모달 타이틀 */}
        <h1 className={`font-Bit text-5xl mb-10 ${styles.searchHeader}`}>방 찾기</h1>
        <input
          type="text"
          value={roomNum}
          onChange={handleRoomNumChange} // 입력 변화를 처리하는 함수 연결
          placeholder="들어갈 도깨비 방 번호를 입력하세요"
          className={`text-center font-bold text-xl ${styles.searchInput}`}
        />

        {/* 버튼 그룹 */}
        <div className="flex justify-center w-full mt-10">
          {/* 입장 버튼 */}
          <div className={`rounded-xl mr-5 ${styles.roomButton}`}>
            <button
              onClick={handleEnterClick} // 클릭 이벤트 핸들러 연결
              className="w-28 h-12 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="button"
            >
              입 장
            </button>
          </div>

          {/* 취소 버튼 */}
          <div className={`rounded-xl ${styles.roomButton}`}>
            <button
              onClick={onClose}
              className="w-28 h-12 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="button"
            >
              취 소
            </button>
          </div>
        </div>
        {/* 조건부 렌더링을 사용하여 RoomEnterModal 표시 */}
        {showRoomEnterModal && (
          <RoomEnterModal
            roomId={isReceiveRoomId ? isReceiveRoomId : isErrorRoomId }
            onClose={() => setShowRoomEnterModal(false)}
          />
        )}
      </div>
    </div>
  );
}
