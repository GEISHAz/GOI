import { useState } from 'react';
import BackA from '../../images/backButton/backA.png';
import BackB from '../../images/backButton/backB.png';
import styles from './back.module.css';
import { useNavigate } from 'react-router-dom';

export default function backButton() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className='mt-5 my-auto flex items-center justify-start'>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className='w-48 my-auto'
          onClick={() => navigate("/")}
        >
          <img src={isHovering ? BackB : BackA} alt="뒤로가기" className={styles.backButton}/>
        </button>
      </div>
    </div>
  )
}