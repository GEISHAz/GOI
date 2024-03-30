import axios from "axios";
import { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/login/authSlice.js';

export function useAuthCheck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intervalIdRef = useRef(null);
  
  const handleLogout = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isLogin'); // 세션스토리지에서 로그인 상태 삭제
    dispatch(logout()); // 리덕스 스토어 로그아웃 처리
    // 백엔드에 로그아웃 알림
    if (accessToken) {
      try {
        await axios.post('https://j10d202.p.ssafy.io/api/auth/logout', {}, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } catch (error) {
        console.error('로그아웃 실패', error);
        alert("로그아웃이 정상적으로 처리되지 않았어요 !")
      }
    }
    // 로그인 페이지로 리다이렉트
    navigate('/login');
  };

  // 401 에러 감지 및 새 토큰 요청 함수
  const requestNewToken = async (accessToken) => {
    try {
      const response = await axios.post('https://j10d202.p.ssafy.io/api/auth/regenerate-token', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // console.log("리스폰스 확인 :", response)
      if (response.status === 200 && response.data.data.accessToken) {
        // console.log("따끈따끈한 새 액세스 토큰", response.data.data.accessToken)
        sessionStorage.setItem('accessToken', response.data.data.accessToken); // 로컬스토리지에 저장하고
        window.location.reload()
        return response.data.data.accessToken; // 새로 발급받은 토큰 반환 
      } else {
        throw new Error('Failed to regenerate token');
      }
    } catch (error) {
      console.error('requestNewToken 함수 실패 -> 토큰 갱신 실패', error);
      handleLogout();
      return null;
    }
  };

  const checkAccess = async () => {
    const userId = sessionStorage.getItem("userId");
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      handleLogout();
      return false;
    }

    // 토큰 유효성 검증을 위한 API 요청 (사용자 정보 get 요청으로 가져오기)
    try {
      await axios.get(`https://j10d202.p.ssafy.io/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 성공적으로 데이터를 받아왔을 때의 처리...
      return true;
    } catch (error) {
      if ((error.response && error.response.data.statusCode === 401) || (error.response && error.response.status === 401)) {
        // 401 에러 시 새 토큰 요청
        // console.log("만료된 액세스 토큰", accessToken)
        return await requestNewToken(accessToken);
      } else {
        // 다른 에러 처리
        console.error('API request failed:', error);
        return false;
      }
    }
  };

  // 15초마다 토큰 검사 실행 -> 초마다 실시하면 너무많은 서버 로그 발생
  useEffect(() => {
    const startTokenValidationInterval = () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }

      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // 중복 실행 방지
      }

      intervalIdRef.current = setInterval(() => {
        checkAccess(); // 여기에서 토큰 유효성 검사 실행 -> 15초마다 실시
      }, 300000); // 60,000ms = 1분
    };

    startTokenValidationInterval();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current); // 컴포넌트 언마운트시 인터벌 정리
      }
    };
  }, [checkAccess]);

  return [checkAccess];
};