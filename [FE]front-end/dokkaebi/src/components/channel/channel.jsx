import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChannelId } from '../../features/channel/channelSlice.js'
import styles from './channel.module.css';
import channel from '../../images/channel/icon_channel.png'
import axios from "axios";

export default function Channel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId")
  const [getChannelInfo, setGetChannelInfo] = useState([]);

  const fetchChannelSelect = async (channelId) => {
    try {
      console.log("들어갈 채널ID 확인 :", channelId)
      console.log("보내는 토큰 확인 :", accessToken)
      console.log("보내는 유저ID 확인 :", userId)
      const res = await axios.post(`https://j10d202.p.ssafy.io/api/channel/enterc`, {
        channelId: channelId,
        userId: userId
      }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("POST 리스폰스 확인 :", res)
      if (res.status === 200) {
        console.log("200 OK 응답 확인!", res.status)
        // channelSlice에 채널 ID 값 업데이트해서 저장해주기
        dispatch(setChannelId(channelId))
        navigate(`/square/${channelId}`);
      } else {
        throw new Error('POST 요청에서 에러 발생');
      }
    } catch (error) {
      console.error('채널 선택 실패', error);
    }
  };

  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken")
    const fetchChannelUserCnt = async () => {
      try {
        const res = await axios.get(`https://j10d202.p.ssafy.io/api/channel/listc`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("GET 리스폰스 확인 :", res)
        if (res.status === 200 && res.data) {
          setGetChannelInfo(res.data)
        } else {
          throw new Error('GET 요청에서 에러 발생');
        }
      } catch (error) {
        console.error('채널 목록 불러오기 실패', error);
      }
    };

    fetchChannelUserCnt();
  }, [accessToken]);

  return (
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-4xl'
        >
          Back
        </button>
      </div>
    
      {/* 채널 컨테이너 */}
      <div className={`flex flex-col items-center justify-center mx-auto flex-grow  ${styles.channelContainer}`}>
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
                <h2 className="text-black font-Bit text-3xl">{channel.channelName} 채널</h2>
                {/* <h2 className="text-black font-Bit text-3xl">채널 이름 나올 곳</h2> */}
                <span className="text-blue-500 text-bold text-2xl">{channel.userCount}/100</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}