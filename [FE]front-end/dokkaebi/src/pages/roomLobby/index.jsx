import Background from "../../images/gamePlay/background6.gif";
import LobbyTop from '../../components/roomLobby/LobbyTop.jsx';
import PlayerList from '../../components/roomLobby/PlayerList.jsx';
import LobbyChat from "../../components/roomLobby/LobbyChat.jsx";

export default function userReadyRoom() {
  // 배경 GIF 설정
  const backgroundStyle = {
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return (
    <div style={backgroundStyle}>
      <LobbyTop />
        {/* 로비에 들어온 유저 리스트와 로비 채팅 컨테이너 */}
        <div className="flex flex-col items-center">
          <PlayerList />
          <LobbyChat />
        </div>
    </div>
  );
}