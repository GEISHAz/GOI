import Background from "../../images/gamePlay/background6.gif";
import LobbyTop from "../../components/roomLobby/LobbyTop.jsx";
import PlayerList from "../../components/roomLobby/PlayerList.jsx";
import LobbyChat from "../../components/roomLobby/LobbyChat.jsx";

import { useLocation } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

export default function userReadyRoom() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  };
  const accessToken = sessionStorage.getItem("accessToken");
  const roomId = sessionStorage.getItem("roomId");

  let location = useLocation();

  const stompClientRef = useRef(null);

  const socketUrl = "https://j10d202.p.ssafy.io/ws-stomp";
  const [response, setResponse] = useState(location.state.response.data);
  const [userList, setUserList] = useState([]);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    console.log("gkrltlfgek", response);
    if (response.userList) {
      setUserList(response.userList);
    } else {
      setUserList(response);
    }
  }, [response]);

  useEffect(() => {
    console.log("방 유저 리스트 확인0", response);
    console.log("방 유저 리스트 확인1", userList);
    // console.log("방 유저 리스트 확인", location.state.res.data);
    // console.log(location.state.content);
  }, [userList]);

  useEffect(() => {
    let reconnectInterval;

    const connect = () => {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(() => socket);
      stompClientRef.current = stompClient;

      stompClient.connect(
        {},
        function (frame) {
          stompClient.subscribe(`/sub/room/chat/${roomId}`, function (message) {
            console.log("방", roomId);
            const receivedMessage = JSON.parse(message.body);
            console.log(receivedMessage);
            console.log(receivedMessage.type);

            if (receivedMessage.type === "ROOM_ENTER") {
              console.log(receivedMessage.data);
              setUserList(receivedMessage.data);
              console.log("받은 유저정보 확인", userList);
            } else if (receivedMessage.type === "ROOM_EXIT") {
              console.log(receivedMessage.data);
              setUserList(receivedMessage.data);
            } else if (receivedMessage.type === "READY") {
              console.log(receivedMessage.data.list);
              setUserList(receivedMessage.data.list);
              setIsStart(receivedMessage.data.ready);
            }
          });
        },
        function (error) {
          // 연결이 끊어졌을 때 재연결을 시도합니다.
          console.log("STOMP: Connection lost. Attempting to reconnect", error);
          reconnectInterval = setTimeout(connect, 1000); // 1초 후 재연결 시도
        }
      );
    };

    connect();

    return () => {
      console.log("unmounting...");
      console.log(stompClientRef.current);

      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        console.log("STOMP: Disconnected");
      }

      if (reconnectInterval) {
        clearTimeout(reconnectInterval);
      }
    };
  }, []);

  return (
    <div style={backgroundStyle}>
      <LobbyTop userList={userList} />
      {/* 로비에 들어온 유저 리스트와 로비 채팅 컨테이너 */}
      <div className="flex flex-col items-center">
        <PlayerList userList={userList} />
        <LobbyChat />
      </div>
    </div>
  );
}
