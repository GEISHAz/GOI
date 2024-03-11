import { Routes, Route } from "react-router-dom";
import Main from './pages/main/index.jsx';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
};