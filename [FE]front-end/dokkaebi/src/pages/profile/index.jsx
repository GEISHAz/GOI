import Background from '../../images/profile/background2.gif';
import ProfileComponent from '../../components/profile/profile.jsx';

export default function Profile() {
   // 배경화면 GIF 설정
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
      <ProfileComponent />
    </div>
  );
}