import Background from '../../images/channel/background4.gif';
import ChannelChoice from '../../components/channel/channel.jsx';

export default function Channel() {
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
      <ChannelChoice />
    </div>
  );
}