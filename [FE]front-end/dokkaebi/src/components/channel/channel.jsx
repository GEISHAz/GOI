import React from "react";
import styles from './channel.module.css';

export default function Channel() {
  // 채널 이름과 인원수 담을 배열 (count는 아직 dummy)
  const channels = [
    { name: "지은탁 채널", count: 99 },
    { name: "김신 채널", count: 99 },
    { name: "써니 채널", count: 99 },
    { name: "저승 채널", count: 99 },
    { name: "삼신할매 채널", count: 99 },
    { name: "유덕화 채널", count: 99 },
    { name: "김은숙 채널", count: 99 },
    { name: "파국 채널", count: 99 },
  ]


  return (
    <div className={`flex flex-col items-center justify-center mx-auto flex-grow mb-20 ${styles.channelContainer}`}>
      <h1 className="text-white font-Bit text-5xl">채널 선택</h1>
      <div className={"flex flex-wrap justify-around w-full"}>
        {channels.map(channel => (
            <div key={channel.name} className={`${styles.channelBox} p-4 m-2 flex flex-col items-center justify-center`}>
            <h2 className="text-white font-Bit text-2xl">{channel.name}</h2>
            <span className="text-white">{channel.count}/100</span>
          </div>
        ))}
      </div>
    </div>
  );
}