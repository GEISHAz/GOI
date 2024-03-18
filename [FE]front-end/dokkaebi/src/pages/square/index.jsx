import React from 'react';
import { useParams } from "react-router-dom";
import Background from '../../images/channel/background4.gif';
import UserList from '../../components/square/UserList';
import RoomList from '../../components/square/RoomList';
import ChatContainer from '../../components/square/ChatContainer';
import TopButtons from '../../components/square/TopButtons';
import styles from './index.module.css';


export default function Square() {
  // /channel/:id (URL 파라미터에서 id 값을 얻음 -> id 값을 사용하여 해당 채널의 데이터를 조회하고 렌더링)
let { id } = useParams();
let index = parseInt(id, 10) - 1; // URL의 id에서 1을 빼서 인덱스를 맞춤
// 이제 'index' 변수를 사용하여 배열에서 해당 채널 데이터에 접근

  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return (
    <div style={backgroundStyle} className={styles.squareContainer}>
      {/* 상단 버튼들 */}
      <TopButtons />
      <h1>광장입니다</h1>
      
      <div className={styles.mainContent}>
        {/* 유저 리스트 */}
        <UserList />

        {/* 방 목록 컨테이너 */}
        <RoomList />
      </div>

      {/* 채팅창 컨테이너 */}
      <ChatContainer />
    </div>
  );
} 
