import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthCheck } from "./api/accessCheck.js";
import { logout } from "./features/login/authSlice.js";
import Main from "./pages/main/index.jsx";
import Hub from "./pages/hub/index.jsx";
import Login from "./pages/login/index.jsx";
import GetUserLogin from "./pages/signUp/index.jsx";
import LoginCallback from "./components/login/loginCallback.jsx";
import Profile from "./pages/profile/index.jsx";
import GamePlay from "./pages/gamePlay/index.jsx";
import Channel from "./pages/channel/index.jsx";
import Square from "./pages/square/index.jsx";
import Rank from "./pages/rank/index.jsx";
import PrivateRoute from "./pages/privateLogin/index.jsx";

const accessCheck = ({ user }) => {
  const dispatch = useDispatch();
  const [authCheck] = useAuthCheck();
  const [component, setComponent] = useState(<div></div>);
  const navigate = useNavigate();

  useEffect(() => {
    authCheck().then((res) => {
      if (res) {
        setComponent(user);
      } else {
        dispatch(logout());
        navigate("/login", { replace: true });
      }
    });
  }, [user]);

  return <div>{component}</div>;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/login" element={<Login />} />
      <Route path="/getUserLogin" element={<GetUserLogin />} />
      <Route path="/loginCallback" element={<LoginCallback />} />
      {/* <Route element={<PrivateRoute />}> */}
      <Route path="/profile/:nickName" element={<Profile />} />
      <Route path="/gamePlay" element={<GamePlay />} />
      <Route path="/channel" element={<Channel />} />
      <Route path="/square/:id" element={<Square />} />
      <Route path="/rank" element={<Rank />} />
      {/* </Route> */}
    </Routes>
  );
}
