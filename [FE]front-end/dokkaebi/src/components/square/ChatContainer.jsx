import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatContainer.module.css'
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { useDispatch, useSelector } from "react-redux";


export default function ChatContainer() {
  const sender = useSelector(state => state.auth.userNickname);
  const channelId = useSelector(state => state.game.channelId)
  const userId = localStorage.getItem("userId");
  const [chatList, setChatList] = useState([]);
  // const [chatMessage, setChatMessage] = useState('')
  const [inputMessage, setInputMessage] = useState('');
  const recentMessage = useRef(null);
  const stompClient = useRef(null);

  useEffect(() => {
    console.log("유즈이펙트 확인!!!!")
    const socket = new SockJS('https://j10d202.p.ssafy.io/ws-stomp');
    stompClient.current = Stomp.over(socket)
    console.log("스톰프 클라이언트 확인 :", stompClient)

    // 유저 연결
    stompClient.current.connect({}, () => {
      console.log("광장에서 채널 연결됨!!")

      // 구독하기
      stompClient.current.subscribe('/sub/square/chat/'+`${channelId}`, (message) => {
        // 받은 메세지 처리할 곳
        const msg = JSON.parse(message.body);
        console.log("message 타입 확인 :", message);
        if (msg.type && msg.type === "TALK") {
          setChatList(chatList => [...chatList, { sender: msg.sender, message: msg.message }]);
        }
      });
    }, error => {
      console.error("채팅 연결 에러", error)
    });

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        console.log("채팅 연결 종료");
        stompClient.current.disconnect();
      }
    };
  }, []);

  // 메세지 보내기 조작할 함수
  const handleSendMessage = (event) => {
    // 새로고침 방지
    if (event) {
      event.preventDefault();
    }

    if (stompClient.current && stompClient.current.connected && inputMessage.trim() !== '') {
      console.log("메시지 채팅 하나를 보냈어요.")
      // console.log("roomId를 확인합니다. :", params.id)
      stompClient.current.send(`square/chat/message`, {}, JSON.stringify({
        roomId: channelId,
        sender: sender,
        message: inputMessage,
        type: 'TALK',
      }));
      
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
    console.log("최신 메세지 들어옴 -> 스크롤 내려가유~")
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
            className={`chat ${message.sender === sender.current ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-bubble">
              {message.sender !== sender.current && (
                <strong>{message.sender} : </strong>
              )}
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
          <input
            type="text"
            className={styles.chatInput}
            value={inputMessage}
            onChange={handleInputChange}  
          />
          <button
              type="submit"
              className="bg-blue-300 text-white rounded-full px-4 py-2 ml-2 focus:outline-none"
            >
              입력
            </button>
        </form>
      </div>
    </div>
  )
}