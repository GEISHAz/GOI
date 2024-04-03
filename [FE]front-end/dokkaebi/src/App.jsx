import React, { useEffect } from "react";
import Router from "./router.jsx";
import "./App.css";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const message = "새로고침 시 문제가 발생할 수 있어요 ! 조심해주세요 !";
      e.returnValue = message;
      return message;
    };

    if (location.pathname !== "/join") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    // 효과음 재생 함수
    const playSound = () => {
      const sound = new Audio("/bgm/ddick.mp3");
      sound.play();
    };

    // 클릭된 요소가 버튼 내부에 있는지 확인하고, 버튼 클릭 시 효과음 재생
    const handleClick = (event) => {
      let element = event.target; // 클릭된 요소
      while (element != null) {
        // 부모 요소를 따라 거슬러 올라가며 검사
        if (element.tagName === "BUTTON") {
          // 요소가 버튼이면 효과음 재생
          playSound();
          break; // 버튼을 찾았으므로 루프 중단
        }
        element = element.parentElement; // 부모 요소로 이동
      }
    };

    // 문서 전체에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick);
    };
  }, [location.pathname]);

  return (
    <div className="font-Galmuri11">
      <Router />
    </div>
  );
}

export default App;
