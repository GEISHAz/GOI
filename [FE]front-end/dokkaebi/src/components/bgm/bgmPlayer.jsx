import React, { useRef, useEffect, useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { togglePlay } from '../../features/bgm/bgmSlice.js';
import musicOn from '../../images/bgm/musicOn.png';
import musicOff from '../../images/bgm/musicOff.png';
import styles from './bgmPlayer.module.css';

export default function BGMPlayer() {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.bgm);
  const [showPrompt, setShowPrompt] = useState(true); // 안내문구 표시 상태
  const [buttonImage, setButtonImage] = useState(musicOff); // 노래 재생 상태 이미지

  // 음악 재생 상태에 따라 버튼 이미지 변경
  useEffect(() => {
    setButtonImage(isPlaying ? musicOn : musicOff);
  }, [isPlaying]); // isPlaying 상태가 변경될 때마다 실행

  useEffect(() => {
    dispatch(togglePlay(false)); // 컴포넌트 마운트 시 음악 재생 상태를 false로 초기화
  }, [dispatch]);

  // 음악 재생 버튼 함수
  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };

  // 페이지 이동 시에도 음악 재생 상태를 유지하기 위해, isPlaying 상태에 따라 음악 재생을 제어
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false); // 5초 후 안내문구 숨김
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    <div className={styles.buttonContainer}>
      <audio ref={audioRef} src="/bgm/letsClean.mp3" loop />
      {showPrompt && <div className={`w-full ${styles.musicPrompt}`}>배경음악을 틀어보세요!</div>}
      <button
        onClick={handleTogglePlay}
        className={styles.toggleButton}
        style={{ backgroundImage: `url(${buttonImage})` }} // 버튼 이미지 동적으로 변경
      ></button>
    </div>
  );
}