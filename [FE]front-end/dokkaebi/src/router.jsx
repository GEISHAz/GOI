import { Routes, Route } from "react-router-dom";
import Main from './pages/main/index.jsx';
import Hub from './pages/hub/index.jsx';
import Login from './pages/login/index.jsx';
import KakaoLogin from './pages/signUp/index.jsx';
import Profile from './pages/profile/index.jsx';
import GamePlay from './pages/gamePlay/index.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
      <Route path="/profile/:nickname" element={<Profile />} />
      <Route path="/gamePlay" element={<GamePlay />} />
    </Routes>
  );
}