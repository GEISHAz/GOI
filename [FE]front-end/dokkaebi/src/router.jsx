import { Routes, Route } from "react-router-dom";
import Main from './pages/main/index.jsx';
import Hub from './pages/hub/index.jsx';
import Login from './pages/login/index.jsx';
import GetUserLogin from './pages/signUp/index.jsx';
import LoginCallback from './components/login/loginCallback.jsx';
import Profile from './pages/profile/index.jsx';
import GamePlay from './pages/gamePlay/index.jsx';
import Channel from './pages/channel/index.jsx';
import Square from './pages/square/index.jsx';
import Rank from './pages/rank/index.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getUserLogin" element={<GetUserLogin />} />
      <Route path="/loginCallback" element={<LoginCallback />} />
      <Route path="/profile/:nickName" element={<Profile />} />
      <Route path="/gamePlay" element={<GamePlay />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
}