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

  // 채널 정보 불러오는 함수 channel Id를 항상 여기서 받아옴 백한테
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
        // console.log(res.data)
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

  // 해당 채널 id 값에 맞는 그 광장 채널에 들여보내달라고 요청하는 함수
  const fetchChannelSelect = async (channelId) => {
    try {
      console.log("보내는 토큰 확인 :", accessToken);
      const res = await axios.post(
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

  // 채널 페이지가 마운트 되었을 때, channel Id가 있는지 검사하고, 있다면 초기화시킨다. 그리고 get 요청 함수 부르기
  useEffect(() => {
    const channelId = sessionStorage.getItem("channelId");
    const exitAndFetchChannels = async () => {
      if (channelId) {
        try {
          await axios.delete(
            `https://j10d202.p.ssafy.io/api/channel/exitc`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          console.log("채널 나가기 성공");
        } catch (error) {
          console.error("채널 나가기 실패", error);
        }
        sessionStorage.removeItem("channelId"); // 세션스토리지도 비워준다.
      }
      await fetchChannelUserCnt(); // 새로운 channelId를 받기 위한 get 요청 함수 부르기
    };

    exitAndFetchChannels();
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
