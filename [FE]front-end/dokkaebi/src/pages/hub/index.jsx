import Background from "../../images/hub/background4.gif";
import HubTop from "../../components/hub/hubTop.jsx";
import HubBottom from "../../components/hub/hubBottom.jsx";

export default function Hub() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  };

  return (
    <div style={backgroundStyle}>
      <HubTop />
      <HubBottom />
    </div>
  );
}
