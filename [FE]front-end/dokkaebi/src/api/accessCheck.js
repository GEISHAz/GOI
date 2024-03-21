import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setIsLogin, logout } from '../features/login/authSlice.js';

export function useAuthCheck() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    const accessToken = localStorage.getItem('accessToken');
    localStorage.clear(); // 로그아웃했다면 로컬스토리지 싹 비우기
    dispatch(logout()); // 리덕스 스토어 로그아웃 처리
    dispatch(setIsLogin(false)); // 리덕스에 있는 로그인설정도 false
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

      if (response.status === 200 && response.data.accessToken) {
        console.log("따끈따끈한 새 액세스 토큰", response.data.accessToken)
        localStorage.setItem('accessToken', response.data.accessToken); // 로컬스토리지에 저장하고
        return response.data.accessToken; // 새로 발급받은 토큰 반환
      } else {
        throw new Error('Failed to regenerate token');
      }
    } catch (error) {
      console.error('requestNewToken 함수 실패 -> 토큰 갱신 실패', error);
      console.log(error)
      handleLogout(); // 토큰 재발급 실패 시 로그아웃 처리
      return null;
    }
  };

  const checkAccess = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem('accessToken');

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
        console.log("만료된 액세스 토큰", accessToken)
        return await requestNewToken(accessToken);
      } else {
        // 다른 에러 처리
        console.error('API request failed:', error);
        return false;
      }
    }
  };

  return [checkAccess];
};