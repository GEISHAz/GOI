import React from 'react';
import styles from './PlayerList.module.css';
import profile from '../../images/gamePlay/bat_slower.gif';
import coin from '../../images/roomLobby/coin.png';

export default function PlayerList() {
  // 이미지 로드 실패 시 대체 이미지를 설정하는 함수
  const onErrorProfileImg = (e) => {
    e.target.src = profile;
  };

  return (
    <div className={styles.PlayerContainer}>
      {/* "들어온 플레이어 목록" 컨테이너를 2열 2행 구조로 만들기 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {[...Array(4)].map((_, index) => ( // 4개의 PlayerBox를 생성
          <div key={index} className={`${styles.PlayerBox} grid grid-cols-2 gap-5`}>
            <div className={styles.playerComponents}>
              <div className="flex flex-col items-center">
                {/* 프로필 이미지 */}
                <img src='' alt='profile' onError={onErrorProfileImg} />
                {/* 플레이어 준비 상태 */}
                <p className={styles.playerReady}>READY</p>
              </div>

              <div className={styles.playerInfo}>
                <div className={styles.player}>
                  {/* 플레이어 닉네임 */}
                  <p className={styles.playerNickName}>닉네임</p>
                  {/* 플레이어 포인트 */}
                  <div className='flex flex-row items-center'>
                    <img className='w-12 mr-2' src={coin} alt="coin icon" />
                    <p className={styles.playerTotalMoney}>500,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
