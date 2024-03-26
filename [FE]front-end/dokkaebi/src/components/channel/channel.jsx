import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Back from "../back/goHub.jsx";
import styles from "./channel.module.css";
import channel from "../../images/channel/icon_channel.png";
import axios from "axios";

export default function Channel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = sessionStorage.getItem("accessToken");
  const [getChannelInfo, setGetChannelInfo] = useState([]);

  const fetchChannelSelect = async (channelId) => {
    try {
      console.log("보내는 토큰 확인 :", accessToken);
      const res = await axios.put(
        `https://j10d202.p.ssafy.io/api/channel/enterc/${channelId}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("POST 리스폰스 확인 :", res);
      if (res.status === 200) {
        console.log("200 OK 응답 확인!", res.status);
        // 해당 채널 id에 접근을 허가받으면 세션스토리지에 해당 채널 id를 저장
        sessionStorage.setItem("channelId", channelId);
        navigate(`/square/${channelId}`);
      } else {
        throw new Error("POST 요청에서 에러 발생");
      }
    } catch (error) {
      console.error("채널 선택 실패", error);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("channelId");
    const fetchChannelUserCnt = async () => {
      try {
        const res = await axios.get(
          `https://j10d202.p.ssafy.io/api/channel/listc`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        // console.log("GET 리스폰스 확인 :", res)
        if (res.status === 200 && res.data) {
          // 받아오는 res.data 확인 -> id, channelName, userCount
          console.log(res.data.data);
          setGetChannelInfo(res.data.data);
          // const channelId = res.data
        } else {
          throw new Error("GET 요청에서 에러 발생");
        }
      } catch (error) {
        console.error("채널 목록 불러오기 실패", error);
        ``;
      }
    };

    fetchChannelUserCnt();
  }, [accessToken]);

  return (
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <Back />

      {/* 채널 컨테이너 */}
      <div
        className={`flex flex-col items-center justify-center mx-auto flex-grow  ${styles.channelContainer}`}
      >
        {/* 채널 헤더 */}
        <div className="flex items-center mb-4 pr-10">
          <img src={channel} alt="Channel Icon" className="h-20 w-20 mr-4" />
          <h1 className="text-white font-Bit text-5xl">채널 선택</h1>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full m-4">
          {getChannelInfo.map((channel, index) => (
            <button
              key={channel.channelName}
              className={`${styles.channelBox} p-4 flex flex-col items-center justify-center`}
              onClick={() => fetchChannelSelect(channel.id)}
            >
              <div className="py-2 px-4 w-full flex flex-row justify-between items-center">
                <h2 className="text-black font-Bit text-3xl">
                  {channel.channelName} 채널
                </h2>
                {/* <h2 className="text-black font-Bit text-3xl">채널 이름 나올 곳</h2> */}
                <span className="text-blue-500 text-bold text-2xl">
                  {channel.userCount}/100
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
