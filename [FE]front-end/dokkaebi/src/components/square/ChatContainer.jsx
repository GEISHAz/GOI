import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatContainer.module.css'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useSelector } from "react-redux";
import axios from 'axios';

export default function ChatContainer() {
  const sender = useSelector(state => state.auth.userNickname);
  // const userId = sessionStorage.getItem("userId");
  const [chatList, setChatList] = useState([]);
  // const [chatMessage, setChatMessage] = useState('')
  const [inputMessage, setInputMessage] = useState('');
  const recentMessage = useRef(null);
  const stompClient = useRef(null);
  const subscriptionRef = useRef(null); // 구독할 때 식별자 지정
  const channelId = sessionStorage.getItem("channelId");

  useEffect(() => {
    // console.log("유즈이펙트 확인!!!!")
    const socket = new SockJS('https://j10d202.p.ssafy.io/ws-stomp');
    console.log('웹소켓 상태 확인 :', SockJS)
    stompClient.current = Stomp.over(socket)
    console.log("스톰프 클라이언트 확인 :", stompClient.current)

    // 유저 연결
    stompClient.current.connect({}, () => {
      console.log("광장에서 채널 연결됨!!")

      // 구독하기
      subscriptionRef.current = stompClient.current.subscribe('/sub/square/chat/'+`${channelId}`, (message) => {
        // 받은 메세지 처리할 곳
        const msg = JSON.parse(message.body);
        if (msg.type && msg.type === "TALK") {
          setChatList(chatList => [...chatList, { sender: msg.sender, message: msg.message }]);
        }
      });
    }, error => {
      console.error("채팅 연결 에러", error)
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe(); // 구독 식별자 번호를 찾아서 구독 취소
      }
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [chatList, channelId]);

  // beforeunload 이벤트 리스너 관리를 위한 별도의 useEffect
  useEffect(() => {
    const handleUnload = async () => {
      // 페이지 벗어남 시 실행되는 로직
      const accessToken = sessionStorage.getItem("accessToken");
      if (channelId) {
        try {
          await axios.post('https://j10d202.p.ssafy.io/api/channel/exitc', {}, {
            headers: { Authorization: `Bearer ${accessToken}` },  
          });
          sessionStorage.removeItem('channelId');
        } catch (error) {
          console.error("채널 나가면서 채널Id 제거 실패", error);
        }
      }
    };

    // beforeunload 이벤트 리스너 등록
    window.addEventListener('beforeunload', handleUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [channelId]);

  // 메세지 보내기 조작할 함수
  const handleSendMessage = (event) => {
    // 새로고침 방지
    if (event) {
      event.preventDefault();
    }

    if (stompClient.current && stompClient.current.connected && inputMessage.trim() !== '') {
      const newMessage = {
        roomId: channelId,
        sender: sender,
        message: inputMessage,
        type: 'TALK',
      };
      console.log("메시지 채팅 하나를 보냈어요.")
      console.log("sender 확인 :", newMessage.sender)

      stompClient.current.send(`/pub/square/chat/message`, {}, JSON.stringify(newMessage));
      setChatList([...chatList, newMessage]);
      setInputMessage('');
    } else {
      alert("잠시 후에 시도해주세요. 채팅이 너무 빠릅니다.")
      console.error('STOMP 클라이언트 연결이 원활하지 못합니다. 기다려주세요');
    }
  };

  // 메시지 input 작동
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 채팅창 스크롤
  const scrollToBottom = () => {
    console.log("최신 채팅내역 불러옴")
    recentMessage.current?.scrollIntoView({ behavior: 'smooth'});
  }

  useEffect(() => {
    scrollToBottom();
  }, [chatList.length])

  return (
    <div className={styles.chatComponents}>
      <div className={styles.messageArea}>
        {chatList.map((message, index) => (
          <div
            key={index}
            ref={recentMessage}
            className={message.sender === sender ? styles.chat_end : styles.chat_start}
          >
            <div className={styles.chat_bubble}>    
              <strong className='ml-2'>{message.sender} : </strong>      
              <span>{message.message}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatArea}>
        <select id="to" className={styles.chatTo}>
          <option value="ALL">ALL</option>
          <option value="1">A에게</option>
          <option value="2">B에게</option>
          <option value="3">C에게</option>
        </select>
        <form onSubmit={handleSendMessage}>
          <div className='flex'>
          <input
            type="text"
            className={styles.chatInput}
            value={inputMessage}
            onChange={handleInputChange}  
          />
            <button
              type="submit"
              className={`${styles.chat_button} bg-blue-300 h-8`}
            >
              입력
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}