import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from './channel.module.css';
import channel from '../../images/channel/icon_channel.png'

export default function Channel() {
  const navigate = useNavigate();
  
  // count는 채널에 접속한 유저수. 지금은 dummy
  const channels = [
    { name: "지은탁 채널", count: 99 },
    { name: "김신 채널", count: 99 },
    { name: "써니 채널", count: 99 },
    { name: "저승 채널", count: 99 },
    { name: "삼신할매 채널", count: 99 },
    { name: "유덕화 채널", count: 99 },
    { name: "김은숙 채널", count: 99 },
    { name: "파국 채널", count: 99 },
  ];

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
          {channels.map((channel, index) => (
            <Link to={`/channel/${index + 1}`} key={channel.name} className={`${styles.channelBox} p-4 flex flex-col items-center justify-center`}>
              <div className="py-2 px-4 w-full flex flex-row justify-between items-center">
                <h2 className="text-black font-Bit text-3xl">{channel.name}</h2>
                <span className="text-blue-500 text-bold text-2xl">{channel.count}/100</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}