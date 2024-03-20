import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/main/logo.gif';
import playButton from '../../images/main/button_play1.png';
import playButtonClicked from '../../images/main/button_play2.png';
import styles from './main.module.css';


// 버튼 변경 전 코드
// export default function Main() {
//   return (
//     <div>
//       <div className='flex flex-col justify-between'>
//         <div className='ml-20 pt-40'>
//           <img
//             src={Logo}
//             alt='투자의 귀재들 로고'
//             className={`${styles.mainLogo} mx-auto`}
//           />
//         </div>
//         <div className='text-center pb-60'>
//           <Link to="/hub" className='font-bold rounded-lg px-6 py-2 mt-20 transition duration-500 ease-in-out bg-white/80 hover:bg-white/100'>
//             Start !
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function Main() {
  const navigate = useNavigate();
  const [image, setImage] = useState(playButton); // 초기 이미지를 playButton로 설정

   const handleClick = () => {
    setImage(playButtonClicked); // 클릭 시 이미지 변경
    setTimeout(() => navigate('/hub'), 300); // 이미지 변경 후 약간의 딜레이를 두고 페이지 이동
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      {/* 투자의 귀재들 로고 */}
      <div className="pt-40 ml-20">
        <img
          src={Logo}
          alt="투자의 귀재들 로고"
          className={`${styles.mainLogo} m-auto`}
        />
      </div>
      {/* 플레이 버튼 */}
      <div className="flex justify-center pb-60">
        <img
          src={image}
          alt="Start Button"
          onClick={handleClick}
          className="cursor-pointer" // 마우스 포인터 변경
        />
      </div>
    </div>
  );
}