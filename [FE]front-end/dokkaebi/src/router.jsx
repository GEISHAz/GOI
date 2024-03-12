import { Routes, Route } from "react-router-dom";
import Main from './pages/main/index.jsx';
import Hub from './pages/hub/index.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hub" element={<Hub />} />
    </Routes>
  );
};