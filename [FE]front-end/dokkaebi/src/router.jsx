import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/index.jsx";
import Hub from "./pages/hub/index.jsx";
import Login from "./pages/login/index.jsx";
import GetUserLogin from "./pages/signUp/index.jsx";
import CallBack from "./components/login/callBack.jsx";
import Profile from "./pages/profile/index.jsx";
import GamePlay from "./pages/gamePlay/index.jsx";
import Channel from "./pages/channel/index.jsx";
import Square from "./pages/square/index.jsx";
import Rank from "./pages/rank/index.jsx";
import RoomLobby from "./pages/roomLobby/index.jsx";
import PrivateRoute from "./pages/privateLogin/index.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Router() {
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      axios.post('https://j10d202.p.ssafy.io/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 액세스 토큰 추가
        },
      })
      .then((res) => {
        console.log('로그아웃 요청 성공:', res);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("isLogin"); // 세션 스토리지에서 로그인 상태 제거
        // dispatch(setIsLogin(false)); // 로그인 상태를 false로 업데이트
        navigate("/hub");
        alert("로그아웃 되었어요 !");
      })
      .catch ((error) => {
        console.log('로그아웃 요청 중 에러 발생:', error);
        alert("로그아웃 처리 중 문제가 발생했어요 !");
      })};
  }, []);

  return (
    <AuthWrapper>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/join" element={<Login />} />
        <Route path="/signUp" element={<GetUserLogin />} />
        <Route path="/callBack" element={<CallBack />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile/:nickName" element={<Profile />} />
          <Route path="/game/:id" element={<GamePlay />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/square/:id" element={<Square />} />
          <Route path="/room/:id" element={<RoomLobby />}></Route>          
          <Route path="/rank" element={<Rank />} />
        </Route>
      </Routes>
    </AuthWrapper>
  );
}
