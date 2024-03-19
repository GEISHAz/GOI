import axios from 'axios';
import { store } from './app/store.js'; // Redux 스토어 가져오기
import { setIsLogin } from '../features/login/authSlice.js';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/",
});

// 응답 인터셉터 설정
api.interceptors.response.use(
  response => response, // 성공 응답은 그대로 반환
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        // 새 액세스 토큰 발급 요청
        const response = await api.post("api/auth/regenerate-token")
        const { accessToken } = response.data;
        console.log("엑세스 토큰 확인 :", accessToken)
        // 새 액세스 토큰 저장
        localStorage.setItem("accessToken", accessToken);

        // 원래 요청 재시도
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        // 새 토큰 발급 실패 시 로그아웃 처리
        console.error("Unable to refresh token", refreshError);
        store.dispatch(setIsLogin(false));
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
