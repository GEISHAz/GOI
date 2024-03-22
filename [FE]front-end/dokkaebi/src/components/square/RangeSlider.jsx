import React, { useState, useEffect } from 'react';
import styles from './RangeSlider.module.css';

// 연도 선택 수정 필요 !!!!!!!! 미완성 !!!!!!!!!!!!!
const RangeSlider = () => {
  const minYear = 2011;
  const maxYear = 2023;
  const minGap = 4;
  // 시작과 종료 연도를 minYear와 minYear+minGap으로 초기화
  const [startYear, setStartYear] = useState(minYear);
  const [endYear, setEndYear] = useState(minYear + minGap);

  // startYear의 상한을 endYear-minGap으로 설정
  // endYear의 하한을 startYear+minGap으로 설정
  useEffect(() => {
    if (startYear > endYear - minGap) {
      setStartYear(endYear - minGap);
    }
    if (endYear < startYear + minGap) {
      setEndYear(startYear + minGap);
    }
  }, [startYear, endYear, minGap]);

  const handleStartChange = (event) => {
    const value = Math.min(Number(event.target.value), endYear - minGap);
    setStartYear(value);
  };

  const handleEndChange = (event) => {
    const value = Math.max(Number(event.target.value), startYear + minGap);
    setEndYear(value);
  };

  // 시작 슬라이더의 스타일을 계산하는 함수
  const calculateStartSliderBackground = () => {
    const percentage = ((startYear - minYear) / (maxYear - minYear)) * 100;
    return `linear-gradient(to right, #ddd ${percentage}%, #4299e1 ${percentage}%)`;
  };

  // 종료 슬라이더의 스타일을 계산하는 함수
  const calculateEndSliderBackground = () => {
    const percentage = ((endYear - minYear) / (maxYear - minYear)) * 100;
    return `linear-gradient(to right, #4299e1 ${percentage}%, #ddd ${percentage}%)`;
  };

  return (
    <div className="range-slider-container">
      <input
        className="range-slider"
        style={{ background: calculateStartSliderBackground() }}
        type="range"
        min={minYear}
        max={maxYear - minGap}
        value={startYear}
        onChange={handleStartChange}
      />
      <input
        className="range-slider"
        style={{ background: calculateEndSliderBackground() }}
        type="range"
        min={minYear + minGap}
        max={maxYear}
        value={endYear}
        onChange={handleEndChange}
      />
      <div className="range-slider-values">
        {startYear} - {endYear}
      </div>
    </div>
  );
};

export default RangeSlider;