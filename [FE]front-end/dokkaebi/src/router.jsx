import { Routes, Route } from "react-router-dom";
import Main from './pages/main/index.jsx';
import Hub from './pages/hub/index.jsx';
import Login from './pages/login/index.jsx';
import KakaoLogin from './components/login/kakaoLogin.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/login" element={<Login />} />
      <Route path="/kakaoLogin" element={<KakaoLogin />} />
    </Routes>
  );
};