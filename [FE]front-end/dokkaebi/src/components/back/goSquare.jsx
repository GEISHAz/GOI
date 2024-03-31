import { useState } from 'react';
import BackA from '../../images/backButton/backA.png';
import BackB from '../../images/backButton/backB.png';
import styles from './back.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function backButton({ roomId }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const channelId = sessionStorage.getItem("channelId");
  const accessToken = sessionStorage.getItem("accessToken");

  const handleBackButtonClick = () => {
    axios
      .delete(`https://j10d202.p.ssafy.io/api/room/exit/${roomId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("방 나가기 성공");
        sessionStorage.removeItem("roomId");
        navigate(`/square/${channelId}`);
      })
      .catch((err) => {
        console.log(err);
        console.log("방 나가기 실패");
      });
  };

  return (
    <div className="flex flex-col mb-10">
      <div className='my-auto flex items-center justify-start'>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className='w-48'
          onClick={handleBackButtonClick}
        >
          <img src={isHovering ? BackB : BackA} alt="뒤로가기" className={styles.goSquare}/>
        </button>
      </div>
    </div>
  )
}