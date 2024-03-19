import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserNickname } from '../../features/login/authSlice';
import ChoiceModal from './choiceModal.jsx';
import styles from './getUserLogin.module.css'
import signUp from '../../images/signUp/signUp.gif';
import blue from '../../images/signUp/blue.gif';
import brown from '../../images/signUp/brown.gif';
import green from '../../images/signUp/green.gif';
import axios from 'axios';

export default function KakaoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 모달에서 선택된 사진 불러오기
  const [nickname, setNickname] = useState('');
  const [isNicknameEmpty, setIsNicknameEmpty] = useState(false); // 닉네임 노입력 상태 관리
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 검사 상태  n관리
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 정규식 검사 상태 관리
  const [nicknameDuplicateError, setNicknameDuplicateError] = useState(false);
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken")

  // 닉네임 중복검사 로직 (백에서 유효성검사 로직 다 되면 작성 예정)
  const handleCheckNickname = async () => {
    // 입력 필드가 비어 있는지 검사
    if (!nickname.trim()) {
    setIsNicknameEmpty(true);
    setIsNicknameValid(true); // 공백 상태로 받았을 때 정규식 메세지 받지 않기 위해 true로 설정
    setIsNicknameChecked(false); // 중복 검사를 통과하지 않았음
    alert("닉네임이 입력되지 않았어요!");
    return; // 함수 실행 중단
  }
    // 한글, 영어, 숫자만 허용하는 정규식
    const regex = /^[가-힣a-zA-Z0-9]+$/;

    // 입력 값이 정규식 조건을 만족하는지 확인
    if (regex.test(nickname) && nickname.length >= 2 && nickname.length <= 10) {
      // 조건을 만족하면 중복검사 로직 진행
      // console.log(nickname);
      setIsNicknameChecked(true);
      setIsNicknameEmpty(false);
      setIsNicknameValid(true); // 닉네임이 유효함
    } else {
      // 조건을 만족하지 않으면 경고 메시지 표시
      alert("이름은 2자 이상 10자 이하의 한글, 영어, 숫자만 사용할 수 있어요 !");
      setIsNicknameChecked(false); // 형식이 맞지 않으므로 중복 검사를 통과하지 않음
      setIsNicknameValid(false); // 닉네임이 유효하지 않음
      return; // 함수 실행 중단
    }

    // 백엔드으로 중복검사 api 요청
    try {
      // API 요청: 닉네임 중복 검사 및 업데이트
      console.log("여기 닉네임 :", nickname)
      const response = await axios.post(`http://localhost:8080/api/users/exist/nick-name`, {
        nickName: nickname,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("성공 데이터 받음 :", response.data);
      setIsNicknameChecked(true);
      setIsNicknameEmpty(false);
      setIsNicknameValid(true); // 닉네임이 유효함
      setNicknameDuplicateError(false) // 중복검사를 통과하였으니 초기화
      alert("도깨비 이름이 설정되었어요 !");
    } catch (err) {
      console.error("닉네임 설정 실패", err);
      if (err.response && err.response.data.statusCode === 401) {
        alert("이미 존재하는 이름이에요 !");
        setIsNicknameChecked(false);
        setIsNicknameValid(false); // 중복된 닉네임으로 인한 유효하지 않음 표시
        setNicknameDuplicateError(true) // 중복된 닉네임이 존재한다고 표시
      } else {
        alert("이름 설정을 실패했어요.. 규칙을 지켜서 다시 설정해주세요");
        setNicknameDuplicateError(false); // 이 경우에는 중복 관련 에러가 아니므로 초기화
      }
    }
  };

  // 닉네임 입력 여부 업데이트
  const handleNicknameChange = (e) => {
    const { value } = e.target;
  
    // 길이가 10자 이하인 경우에만 상태 업데이트
    if (value.length <= 10) {
      setNickname(value);
      setIsNicknameEmpty(!value);
      setIsNicknameChecked(false); // 닉네임을 변경할 때마다 중복 검사를 다시 해야 함
    }
  };

  // 첫 닉네임 -> dispatch하여 store에 저장
  const handleSetInfo = async () => {
    // 닉네임이 입력되지 않았다면 함수 중단
    if (!nickname) {
      setIsNicknameEmpty(true);
      alert("도깨비 이름이 설정되지 않았어요 !");
      return;
    }

    // 닉네임 중복검사를 하지 않았다면 함수 중단
    if (!isNicknameChecked || !isNicknameValid) {
      alert("중복검사를 다시 확인해주세요 !");
      return;
    }

    // 프로필 이미지 설정하지 않았다면 함수 중단
    if (!userProfileImage) {
      alert("도깨비 이미지가 설정되지 않았어요 !")
      return;
    }

    // 닉네임과 이미지가 모두 설정된 경우에만 실행
    if (nickname && userProfileImage) {
      try {
        // 여기에 회원가입 정보를 백엔드로 전송하는 API 호출 로직 추가
        await axios.put(`http://localhost:8080/api/users/${userId}/info`, {
          nickName: nickname,
          imageId: userProfileImage,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });                                   
  
        // 닉네임 스토어에 저장, 첫 도깨비 이미지는 choiceModal에서 스토어에 저장함
        dispatch(setUserNickname(nickname));
        alert("가입을 환영합니다 !");
        console.log("가입 완료 !");
        navigate("/hub");
      } catch (error) {
        console.error("회원가입 실패", error);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center mt-2">
      <div className="flex flex-row justify-center items-stretch w-full gap-0">
        {/* 중앙 왼쪽 */}
        <div className={`${styles.loginBG} flex flex-col items-center justify-center w-1/3 bg-black/60 rounded-3xl p-10 mt-10`}>
          <h1 className='font-bold text-white text-3xl mb-10'>첫 도깨비 일원이신가요?</h1>
          <h2 className='font-bold text-white text-xl mb-20'>닉네임과 프로필을 설정해보세요 !</h2>
          <img
            src={signUp}
            alt="카카오 로그인"
            className={`${styles.clickCursor} w-1/2`}
            onClick={handleSetInfo}
          />
          <div className='w-1/4 flex justify-center mt-5'>
            <img src={blue} alt="파랑도깨비" className='mt-3'/>
            <img src={brown} alt="밤색도깨비" />
            <img src={green} alt="초록도깨비" />
          </div>
        </div>

        {/* 중앙 오른쪽 */}
        <div className={`${styles.loginBG} flex flex-col justify-center w-1/3 bg-black/70 rounded-3xl p-10 mt-10`}>
          <h1 className='font-bold text-white text-left text-3xl mb-5'>도깨비 이름</h1>
          <div className="flex w-full justify-start items-center mb-5">
            <input
              type="text"
              className={`text-center bg-white ${styles.inputBackground}`}
              value={nickname}
              maxLength={10}
              onChange={handleNicknameChange}
            />
          </div>
          <div className='w-full flex justify-end mb-10'>
          {isNicknameEmpty && <span className={`${styles.nicknameWarning}`}>이름이 입력되지 않았어요!</span>}
          {!isNicknameEmpty && isNicknameChecked && !nicknameDuplicateError && <span className={`${styles.nicknameOkay}`}>사용 가능한 도깨비 이름이에요!</span>}
          {!isNicknameValid && !nicknameDuplicateError && <span className={`${styles.nicknameValid}`}>이름은 2자~10자까지 한글, 영어, 숫자만 !</span>}  
          {nicknameDuplicateError && <span className={`${styles.nicknameWarning}`}>이름이 이미 있어요 !</span>}  
            <button
              className={`text-black bg-white font-bold py-2 px-4 ${styles.buttonBackground}`}
              onClick={handleCheckNickname}
            >
              중복검사
            </button>
          </div>
          <h1 className='font-bold text-white text-3xl mb-5'>도깨비 설정</h1>
          <div className="text-center mb-4">
            <button onClick={openModal} className={`text-black bg-white font-bold py-2 px-4 ${styles.buttonBackground}`}>
              변경하기
            </button>
          </div>
          {isModalOpen && <ChoiceModal onClose={closeModal} />}

          <div className="flex justify-center items-center mt-5 mb-20">
            <div className={`${styles.previewBox}`}>
              {userProfileImage && <img src={userProfileImage} alt="초기 프로필 테마" className='w-32' />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}