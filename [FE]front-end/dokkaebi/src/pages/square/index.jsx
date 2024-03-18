// import React from 'react';
// import { useParams } from "react-router-dom";
// import Background from '../../images/channel/background4.gif';
// import UserList from '../../components/square/UserList';
// import RoomList from '../../components/square/RoomList';
// import ChatContainer from '../../components/square/ChatContainer';
// import TopButtons from '../../components/square/TopButtons';
// import styles from './index.module.css';


// export default function Square() {
//   // /channel/:id (URL 파라미터에서 id 값을 얻음 -> id 값을 사용하여 해당 채널의 데이터를 조회하고 렌더링)
//   let { id } = useParams(); 

//   // 배경 GIF 설정
//   const backgroundStyle = {
//     backgroundImage: `url(${Background})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     width: '100%',
//     height: '100%',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//   };

//   return (
//     <div style={backgroundStyle} className={styles.squareContainer}>
//       {/* 상단 버튼들 */}
//       <TopButtons />
      
//       <div className={styles.mainContent}>
//         {/* 유저 리스트 */}
//         <UserList />

//         {/* 방 목록 컨테이너 */}
//         <RoomList />
//       </div>

//       {/* 채팅창 컨테이너 */}
//       <ChatContainer />
//     </div>
//   );
// } 
