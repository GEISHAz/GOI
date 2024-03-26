import React, { useEffect, useState } from 'react';
import styles from './UserList.module.css';
import axios from "axios";
import blue from '../../images/character/blue.gif';
import brown from '../../images/character/brown.gif';
import green from '../../images/character/green.gif';
import yellow from '../../images/character/yellow.gif';
import pink from '../../images/character/pink.gif';
import orange from '../../images/character/orange.gif';


export default function UserList() {
  const accessToken = sessionStorage.getItem("accessToken");
  const [isUserInfo, setIsUserInfo] = useState([])
  
  const images = [
    { id: 1, src: blue, alt: "파랑도깨비" },
    { id: 2, src: brown, alt: "밤색도깨비" },
    { id: 3, src: yellow, alt: "노랑도깨비" },
    { id: 4, src: pink, alt: "핑크도깨비" },
    { id: 5, src: orange, alt: "오렌지도깨비" },
    { id: 6, src: green, alt: "초록도깨비" },
  ];
  
  // imageId를 받아 해당하는 이미지 객체를 반환하는 함수
  const findImageById = (imageId) => images.find(image => image.id === imageId);
  
  // 페이지 들어갔을 때 fetchUserInfo() 함수 실행 -> [accessToken] 토큰 발급 될 때마다 다시 함수 실행
  useEffect(() => {
    const channelId = sessionStorage.getItem("channelId");
    const fetchUserInfo = async () => {
      console.log("chaanleId 확인", channelId)
      try {
        const response = await axios.get(`https://j10d202.p.ssafy.io/api/square/channellist/${channelId}`, {
          headers : { Authorization: `Bearer ${accessToken}` },
        });
        console.log("리스폰스 확인 :", response)
        if (response.status === 200 && response.data.data) {
          setIsUserInfo(response.data.data);
        } else {
          throw new Error("에러 떴어요")
        }
      } catch (error) {
        console.error('유저 정보 불러오기 실패', error)
      }
    };
    fetchUserInfo();
  }, [accessToken])

  return (
    // "접속 중인 유저" 컨테이너
    <div className={styles.userContainer}>
      <h1 className="font-Bit text-white text-2xl text-center m-4">접속 중인 유저</h1>

      {/* 유저 상태 표시 (게임 중/대기 중) 리스트 */}
      <div className={`flex flex-col items-center text-center ${styles.userState}`}>
        {isUserInfo.map((user) => {
        const image = findImageById(user.imageId); // 유저의 imageId에 해당하는 이미지 객체 찾기
        return (
          <div key={user.id} className='flex flex-row my-auto'>
            <div>
              {image && <img src={image.src} alt={image.alt} className="h-10 w-10" />}
            </div>
            <div>
              <span>{user.nickName}</span>
            </div>
            <div className='ml-2'>
              <span>{user.status}원</span>
            </div>
          </div>
        )
        })}
      </div>
    </div>
  );
};