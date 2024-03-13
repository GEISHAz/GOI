import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/main/logo.gif';
import styles from './main.module.css';

export default function Main() {
  return (
    <div>
      <div className='flex flex-col justify-between'>
        <div className='ml-20 pt-40'>
          <img
            src={Logo}
            alt='투자의 귀재들 로고'
            className={`${styles.mainLogo} mx-auto`}
          />
        </div>
        <div className='text-center pb-60'>
          <Link to="/hub" className='font-bold rounded-lg px-6 py-2 mt-20 transition duration-500 ease-in-out bg-white/80 hover:bg-white/100'>
            Start !
          </Link>
        </div>
      </div>
    </div>
  );
}