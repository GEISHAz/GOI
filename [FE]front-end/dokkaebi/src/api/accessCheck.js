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

  const checkAccess = async () => {
    const accessToken = localStorage.getItem('accessToken');
    // 액세스토큰 없다면 바로 로그아웃
    // if (!accessToken) {
    //   handleLogout();
    //   return false;
    // }

    // 액세스 토큰이 만료되었다면, 그 액세스 토큰을 담아서 새 액세스 토큰으로 바꾸어달라고 요청하기
    try {
      const response = await axios.post('https://j10d202.p.ssafy.io/api/auth/regenerate-token', {}, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // 성공적으로 토큰 갱신하면, 새 액세스 토큰을 로컬 스토리지에 저장
      if (response.status === 200) {
        localStorage.setItem('accessToken', response.data.accessToken);
        // window.location.reload(); // 새로고침 한 번 해주기
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await handleLogout();
        return false;
      }
      // 액세스 토큰 갱신 실패 혹은 그 외의 오류
      console.error('액세스 토큰 갱신 시도 중 다른 오류 발생', error);
    }
  };

  return [checkAccess];
};