import KakaoLogin from "../../components/signUp/kakaoLogin";
import Background from '../../images/main/background.gif';

export default function SignUp() {
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
      <KakaoLogin />
    </div>
  );
}