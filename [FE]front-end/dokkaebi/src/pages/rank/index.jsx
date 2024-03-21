import React from 'react';
import Background from '../../images/rank/background7.gif';
import Ranking from '../../components/rank/ranking';


export default function Rank() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return (
    <div style={backgroundStyle}>
      <Ranking />
    </div>
  );
} 
