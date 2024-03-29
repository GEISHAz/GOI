import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";
import axios from "axios";
import blue from "../../images/character/blue.gif";
import brown from "../../images/character/brown.gif";
import green from "../../images/character/green.gif";
import yellow from "../../images/character/yellow.gif";
import pink from "../../images/character/pink.gif";
import orange from "../../images/character/orange.gif";

export default function UserList() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [isUserInfo, setIsUserInfo] = useState([]);

  const images = [
    { id: 1, src: blue, alt: "파랑도깨비" },
    { id: 2, src: brown, alt: "밤색도깨비" },
    { id: 3, src: yellow, alt: "노랑도깨비" },
    { id: 4, src: pink, alt: "핑크도깨비" },
    { id: 5, src: orange, alt: "오렌지도깨비" },
    { id: 6, src: green, alt: "초록도깨비" },
  ];

  // imageId를 받아 해당하는 이미지 객체를 반환하는 함수
  const findImageById = (imageId) =>
    images.find((image) => image.id === imageId);

  // 페이지 들어갔을 때 fetchUserInfo() 함수 실행 -> [accessToken] 토큰 발급 될 때마다 다시 함수 실행
  useEffect(() => {
    const channelId = sessionStorage.getItem("channelId");
    const fetchUserInfo = async () => {
      console.log("chaanleId 확인", channelId);
      try {
        const response = await axios.get(
          `https://j10d202.p.ssafy.io/api/square/channellist/${channelId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        console.log("리스폰스 확인 :", response);
        if (response.status === 200 && response.data.data) {
          setIsUserInfo(response.data.data);
        } else {
          throw new Error("에러 떴어요");
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
      }
    };

    // 새로고침 이벤트 리스너 추가
    const handleRefresh = () => {
      console.log("유저 정보 새로고침 확인");
      fetchUserInfo();
    };
  
    window.addEventListener('refreshUserList', handleRefresh);
  
    // 첫 로딩 시에도 데이터를 불러옴
    fetchUserInfo();
  
    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('refreshUserList', handleRefresh);
    };
  }, [accessToken]); // accessToken이 변경될 때도 데이터를 다시 불러옴


  return (
    // "접속 중인 유저" 컨테이너
    <div className={styles.userContainer}>
      <h1 className="font-Bit text-white text-2xl text-center m-4">
        접속 중인 유저
      </h1>

      {/* 유저 상태 표시 (게임 중/대기 중) 리스트 */}
      <div
        className={`flex flex-col items-center text-center ${styles.userState}`}
      >
        <div className={`overflow-y-auto ${styles.userListScroll}`}>
          {isUserInfo.map((user) => {
            const image = findImageById(user.imageId); // 유저의 imageId에 해당하는 이미지 객체 찾기
            let statusText = "알 수 없는 상태"; // 기본값 설정
            let statusClass = ""; // 상태에 따른 클래스명 기본값

            // user.status 값에 따라 statusText 및 statusClass 업데이트
            if (user.status === 0) {
              statusText = "로비";
              statusClass = styles.login; // CSS 모듈의 클래스명
            } 
            else if (user.status === 1) {
              statusText = "대기중";
              statusClass = styles.waiting;
            } 
            else if (user.status === 2) {
              statusText = "게임중";
              statusClass = styles.playing;
            }

            return (
              <div key={user.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                <div className="my-auto">
                  {image && (
                    <img src={image.src} alt={image.alt} className="h-10 w-10" />
                  )}
                </div>
                <div className="my-auto ml-4">
                  <span>{user.nickName}</span>
                </div>
                <div className={`my-auto flex justify-end ml-4 ${statusClass}`}>
                  <span>{statusText}</span>
                </div>
              </div>
            );
          })}
          {/* <div>
            더미데이터
          </div>
          <div>
            더미데이터
          </div>
          <div>
            더미데이터
          </div>
          <div>
            더미데이터
          </div>
          <div>
            더미데이터
          </div> */}
        </div>
      </div>
    </div>
  );
}
