import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./RoomCreateModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import lock from "../../images/square/icon_lock.png";
import unlocked from "../../images/square/icon_unlocked.png";
import {
  setRoomTitle,
  setRoomPassword,
  setRoomYears,
} from "../../features/square/roomSlice.js";


export default function RoomCreateModal({ onClose, userName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const userNickname = useSelector((state) => state.auth.userNickname); // 회원가입에서 설정한 닉네임 불러오기
  const [isRoomTitle, setIsRoomTitle] = useState(userNickname + "님의 방"); // 방 제목 상태 관리
  const [isPrivate, setIsPrivate] = useState(false); // 비공개 체크박스의 상태를 위한 훅
  const [isPassword, setIsPassword] = useState(null); // 비밀번호 상태 관리
  const channelId = sessionStorage.getItem("channelId");

  // startYear와 endYear를 위한 상태 추가
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endYearOptions, setEndYearOptions] = useState([]);


  // 시작 연도가 변경될 때 종료 연도의 옵션을 업데이트하는 효과
  useEffect(() => {
    if (startYear) {
      const minEndYear = Math.max(Number(startYear) + 4, 2015); // 최소 종료 연도는 시작 연도 + 4년, 2015년부터 시작
      const options = [];
      for (let year = minEndYear; year <= 2023; year++) {
        options.push(year);
      }
      setEndYearOptions(options);
      setEndYear(minEndYear); // 자동으로 최소 가능한 종료 연도를 설정
    } else {
      setEndYearOptions([]);
      setEndYear('');
    }
  }, [startYear]);


  // RangeSlider에서 startYear와 endYear가 변경될 때 부모 컴포넌트의 상태를 업데이트하는 콜백 함수
  // const handleYearChange = (start, end) => {
  //   setStartYear(start);
  //   setEndYear(end);
  // };

  const handlePrivateChange = (e) => {
    // 체크박스 상태 변경 함수
    setIsPrivate(e.target.checked);
  };

  // 비밀번호 숫자 4자리로 제한
  const handlePasswordChange = (e) => {
    // 입력값이 숫자이고 4자리 이하인지 확인
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      // 정규표현식을 사용하여 검증
      // 상태 업데이트 로직
      setIsPassword(value); // 상태 업데이트
    }
  };

  // "생성" 버튼 기능
  const handleCreateRoom = async () => {
    // console.log(userNickname, "님의 방 생성 요청");
    // 방 제목을 입력하지 않았을 경우
    if (!isRoomTitle) {
      alert("방 제목을 설정해주세요 !");
      return; // 함수 중단
    }

    // 비공개 체크는 했으나 비밀번호를 입력하지 않았을 경우
    if (isPrivate && !isPassword) {
      alert("비밀번호를 설정하지 않았어요 !");
      return; // 함수 중단
    }

    // 사용자가 "생성" 버튼을 눌러서 방을 만들면, 스토어에 그 정보들을 저장하겠다
    // 그 정보라 하면은, 사용자가 설정한 방제목, 방비밀번호, 연도 3가지

    // 시작 연도와 종료 연도가 모두 설정되었는지 확인
    if (startYear && endYear && isRoomTitle) {
      console.log("channelId 확인", channelId);
      try {
        const response = await axios.post(
          "https://j10d202.p.ssafy.io/api/square/create",
          {
            title: isRoomTitle,
            isPrivate: isPrivate,
            password: isPrivate ? isPassword : null, // 비공개 방일 경우만 비밀번호 설정
            startYear: startYear,
            endYear: endYear,
            channelId: channelId,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log("방 생성 요청 확인:", response);
          if (response.data && response.data.roomId) {
            console.log("방 생성 성공:", response);
            // 방 생성 성공하면, 방 정보를 세션스토리지에 저장
            sessionStorage.setItem(
              "roomId",
              JSON.stringify(response.data.roomId)
            );
            // 방 생성 성공하면 -> 생성한 방으로 이동
            navigate(`/room/${response.data.roomId}`, {
              state: JSON.parse(JSON.stringify({ response })),
            });
          } else {
            console.error("방 생성 오류: roomId이 없습니다.");
            alert("방 생성 중 오류가 발생했습니다.");
          }
        }
      } catch (error) {
        console.error("방 생성 오류:", error);
        alert("방 생성 중 오류가 발생했습니다.");
      }
    } else {
      alert("방 설정이 제대로 이루어지지 않았어요 !");
    }
  };

  return (
    <div className={styles.background}>
      {/* 모달 컨테이너 */}
      <div
        className={`${styles.container} flex flex-col items-center justify-center`}
      >
        {/* 모달 타이틀 */}
        <h1 className="font-Bit text-4xl mb-10">방 만들기</h1>


        {/* 방 만들기 인풋 그리드 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full mb-4 mr-40">

          {/* 방 제목 */}
          <div className="flex justify-end items-center">
            <label htmlFor="roomTitle" className="text-2xl mr-2">
              방 제목
            </label>
          </div>
          <div>
            <input
              type="text"
              value={isRoomTitle}
              className="border-2 border-gray-300 p-1"
              maxLength={10}
              onChange={(e) => setIsRoomTitle(e.target.value)}
              // defaultValue={userNickname + "의 방"}
            />
          </div>

          {/* 비공개 */}
          <div className="flex justify-end items-center">
            <label htmlFor="roomPrivate" className="text-2xl mr-2">
              비공개
            </label>
          </div>
          <div className="flex items-center">
            <img
              src={isPrivate ? lock : unlocked}
              alt={isPrivate ? "Locked" : "Unlocked"}
              className="w-10 h-auto mr-2"
            />
            <input
              type="checkbox"
              id="roomPrivate"
              name="roomPrivate"
              className="mr-2"
              onChange={handlePrivateChange}
            />

            {isPrivate && (
              <input
                type="text"
                id="roomPassword"
                name="roomPassword"
                placeholder="비밀번호 입력"
                maxLength={4}
                value={isPassword} // 입력 상태와 바인딩
                onChange={handlePasswordChange} // 입력 처리 함수
                className="border-2 border-gray-300 p-1 w-32"
              />
            )}
          </div>
        </div>


        <div className="flex justify-center w-full">
          {/* 연도 선택 div */}
          <div className="flex flex-row items-center justify-center">
            {/* 연도 선택 - 시작 연도 */}
            <div className="flex items-center mr-4">
              <label htmlFor="startYear" className="text-2xl">시작 연도</label>
              <select
                id="startYear"
                name="startYear"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                className="border-2 border-gray-300 p-1 ml-2"
              >
                <option value="">선택</option>
                {[...Array(2019 - 2011 + 1).keys()].map((year) => (
                  <option key={year} value={year + 2011}>{year + 2011}</option>
                ))}
              </select>
            </div>

            {/* 연도 선택 - 종료 연도 */}
            <div className="flex items-center">
              <label htmlFor="endYear" className="text-2xl">종료 연도</label>
              <select
                id="endYear"
                name="endYear"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                className="border-2 border-gray-300 p-1 ml-2"
                disabled={!startYear} // 시작 연도가 선택되지 않으면 비활성화
              >
                <option value="">선택</option>
                {endYearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
          

        {/* 버튼 그룹 */}
        <div className="flex justify-center w-full mt-10">
          {/* 확인 버튼 */}
          <button
            className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCreateRoom}
          >
            생성
          </button>

          {/* 취소 버튼 */}
          <button
            onClick={onClose}
            className="w-24 h-12 bg-red-500 hover:bg-red-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
            type="button"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
