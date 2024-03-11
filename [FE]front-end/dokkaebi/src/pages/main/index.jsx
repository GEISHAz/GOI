import Background from '../../images/main/background.gif';

export default function Main() {
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
    <div style={ backgroundStyle }>
      <h1>메인페이지</h1>
    </div>
  );
}