import { useState, useEffect } from 'react';
import styles from './Timer.module.css'

export default function AuthNumTimer() {
    // 초기 타이머 시간 (초)을 정의함. 180초, 3분.
    const initialTime = 180;
    // 남은 시간을 상태로 관리함.
    const [remainingTime, setRemainingTime] = useState(initialTime);

    useEffect(() => {
        // useEffect를 사용하여 컴포넌트가 마운트될 때 타이머 시작.
        const timer = setInterval(() => {
            // 남은 시간이 0보다 크면 1초씩 감소시킴.
            if (remainingTime > 0) {
                setRemainingTime((prevTime) => prevTime - 1);
            } else {
                // 남은 시간이 0이 되면 타이머 정지.
                clearInterval(timer);
            }
        }, 1000);

        // 컴포넌트가 언마운트되면 타이머 정지
        return () => clearInterval(timer);
        
    }, [remainingTime]); // remainingTime이 변경될 때마다 useEffect가 다시 실행됨.

    // 시간을 분과 초로 변환하는 함수 정의.
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div>
            {/* 인증번호 유효 시간을 화면에 출력. */}
            <span className={styles.timer}>{formatTime(remainingTime)}</span>
        </div>
    );
}