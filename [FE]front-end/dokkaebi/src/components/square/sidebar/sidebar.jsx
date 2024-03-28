import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import Messenger from './messenger.jsx'
import FriendAddModal from './friendAddModal.jsx';
import FriendAlarm from './friendAlarmModal.jsx';
import FriendItem from './friendItem.jsx';
import styles from './sidebar.module.css';

const Sidebar = ({ toggleSidebar }) => {
  const client = useRef(null); // 구독할 클라이언트
  const subscriptionRef = useRef(null); // 구독할 때 식별자 지정
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isFriendList, setIsFriendList] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true); // 음악 멈춤 안내 문구
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false); // 친구 추가 모달 관리
  const [isFriendAlarm, setIsFriendAlarm] = useState(false); // 친구 요청 알림관리
  const [isFriendChat, setIsFriendChat] = useState([]);
  const userNickname = useSelector((state) => state.auth.userNickname);
  const accessToken = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");
  
  // 친구를 클릭하면 메신저가 열리는 함수
  const handleFriendClick = (friend) => {
    setSelectedFriend(friend); // 선택된 친구 상태 업데이트
  };

  // 메신저 닫기 함수
  const toggleMessageBar = () => {
    setSelectedFriend(null); // 선택된 친구 상태를 null로 설정하여 메신저를 닫음
  };

  const friendList = async () => {
    try {
      const res = await axios.get(`https://j10d202.p.ssafy.io/api/friend/${userId}/list`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("친구 목록 불러오기 :", res)
      if (res.status === 200 && res.data.data) {
        console.log("메세지 확인 :", res.data.msg);
        const friends = res.data.data.map(friend => ({
          id: friend.friendId,
          nickName: friend.nickName,
          friendListId: friend.friendListId,
        }));
        setIsFriendList(friends);
      } else {
        throw new Error('에러 발생');
      }
    } catch (error) {
      console.error('친구 목록 불러오기 실패', error);
    }
  };

  const friendDelete = async (friendListId) => {
    try {
      console.log("friendListId 확인 :", friendListId)
      await axios.delete(`https://j10d202.p.ssafy.io/api/friend/${userId}/delete`, {
        data: { friendListId: friendListId },
        headers : {  Authorization: `Bearer ${accessToken}` },
      });
      alert("도깨비 친구를 삭제했어요")
      friendList(); // 친구 목록 다시 불러오기
    } catch (error) {
      console.error('친구 삭제 실패', error)
      console.log(error)
    }
  };

  // 친구 추가 모달 열기
  const openAddFriendModal = () => {setIsAddFriendModalOpen(true);};

  // 친구 추가 모달 닫기
  const closeAddFriendModal = () => {setIsAddFriendModalOpen(false);};

  // 친구 요청 알림 모달 열기
  const openAlarmModal = () => {setIsFriendAlarm(true)}

  // 친구 요청 알림 모달 닫기
  const closeAlarmModal = () => {setIsFriendAlarm(false)}

  // 친구 목록 갱신 함수
  const refreshFriendList = () => {friendList()};

  useEffect(() => {
    friendList();
  }, []);

  // 친구와의 채팅 연결
  useEffect(() => {
    // 친구와의 1대1 채팅을 위해 새로운 독립적인 웹소켓 연결
    const connectWebSocket = () => {
      const sock = new SockJS('https://j10d202.p.ssafy.io/ws-stomp');
      client.current = Stomp.over(sock);
      
      client.current.connect({}, () => {
        console.log("친구 채팅 연결됨!!")
        // 사용자의 모든 친구와의 채팅 채널에 구독
        isFriendList.forEach(friend => {
          const friendListId = friend.friendListId;
          subscriptionRef.current = client.current.subscribe(
            '/sub/friend/chat/' + `${friendListId}`,
            (message) => {
              // 받은 메세지 처리할 곳
              const msg = JSON.parse(message.body);
              if (msg.type && msg.type === "TALK") {
                setIsFriendChat(prevMessages => [...prevMessages, msg]);
              }
          });
        });
      }, (error) => {
        console.error('친구 채팅 연결 에러', error);
      });

      return () => {
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe(); // 구독 식별자 번호 찾아서 구독 취소
        }

        if (client.current && client.current.connected) {
          client.current.disconnect();
        }
      };
    };

    connectWebSocket();
  }, [isFriendList]);

  // 메세지 보내기 조작할 함수 -> Messenger.jsx로 props 내려서 작동시킴
  const handleSendMSG = (message) => {
    if (
      client.current &&
      client.current.connected &&
      message.trim() !== ""
    ) {
      const newMsg = {
        roomId: selectedFriend.friendListId,
        sender: userNickname,
        message: message,
        type: "TALK",
      };
      console.log("친구에게 채팅 하나를 보냈어요.");
      console.log("sender 확인 :", newMsg.sender);

      client.current.send(
        `/pub/friend/chat/message`,
        {},
        JSON.stringify(newMsg)
      );
      // setIsFriendChat([...isFriendChat, {sender: userNickname, message: message}])
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빨라요 !");
      console.error("STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요");
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* 사이드바 내용 */}
      <nav>
        <div className={`flex flex-row p-4 ${styles.menuBox}`}>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`} onClick={openAddFriendModal}>친구 추가</button>
          <button className={`text-center text-white text-2xl font-bold ${styles.menu}`} onClick={openAlarmModal}>알림</button>
        </div>
      </nav>

      {/* 친구 목록 */}
      <nav>
        <div className={`flex flex-col items-center overflow-y-auto ${styles.friendContianer}`}>
          {isFriendList.map((friend, index) => (
            <FriendItem
              key={index}
              friend={friend} // friend 라는 인자로 props 해준다
              onDeleteFriend={friendDelete} // 삭제하는 함수 props
              onFriendClick={handleFriendClick} // 메신저 토글 함수 props
            />
          ))}
        </div>
      </nav>

      <nav>
        <div className='flex justify-center p-10'>
          <button
            onClick={toggleSidebar}
            className={`text-2xl font-bold text-white text-center ${styles.closeButton}`}
            >
            닫기
          </button>
        </div>
          {showPrompt && <div className={`w-full text-center font-bold ${styles.musicPrompt}`}>음악이 잠시 멈춥니다 !</div>}
      </nav>

      {/* 친구 메신저 열고 닫기 */}
      {selectedFriend && <Messenger
        selectedFriend={selectedFriend} // 선택된 친구 props
        toggleMessageBar={toggleMessageBar} // 메신저 열고 닫는 함수 props
        handleSendMSG={handleSendMSG} // 메신저 조작 함수 props
        isFriendChat={isFriendChat} // 채팅 내역 props
        setIsFriendChat={setIsFriendChat} // 채팅 내역 저장한거 props -> 이전 채팅 기록을 꺼내기 위함
      />}

      {/* 친구 추가 모달 열고 닫기 */}
      {isAddFriendModalOpen && <FriendAddModal onClose={closeAddFriendModal} />}

      {/* 친구 요청 알림 모달 열고 닫기 */}
      {isFriendAlarm && <FriendAlarm onRefreshFriendList={refreshFriendList} onAlarmClose={closeAlarmModal} />}
    </aside>
  );
};

export default Sidebar;
