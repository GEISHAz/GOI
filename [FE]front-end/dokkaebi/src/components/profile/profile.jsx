import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUserNickname, setUserProfileImage } from '../../features/login/authSlice';
import axios from 'axios';
import ChangeModal from './changeModal.jsx';
import blue from '../../images/profile/blue.gif';
import BackA from '../../images/hub/backA.png';
import BackB from '../../images/hub/backB.png';
import styles from './profile.module.css'

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileImage = useSelector((state) => state.auth.userProfileImage); // 회원가입에서 설정한 프로필 사진 불러오기
  const userNickname = useSelector((state) => state.auth.userNickname); // 회원가입에서 설정한 닉네임 불러오기
  const [selectedImage, setSelectedImage] = useState(userProfileImage); // 초기값을 현재 프로필 이미지로 설정
  const [nickname, setNickname] = useState(userNickname); // 현재 닉네임
  const [previousNickname, setPreviousNickname] = useState(''); // 이전 닉네임
  const [isNicknameEmpty, setIsNicknameEmpty] = useState(false); // 닉네임 노입력 상태 관리
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 검사 상태 관리
  const [isNicknameValid, setIsNicknameValid] = useState(true); // 닉네임 정규식 검사 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const userId = localStorage.getItem("userId"); // 로컬 스토리지에서 userId 가져오기
  const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken 가져오기

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleNicknameChange = async () => {

    if (nickname.trim().length === 0) {
      setIsNicknameEmpty(true);
      setIsNicknameValid(true); // 공백 상태로 받았을 때 정규식 메세지 받지 않기 위해 true로 설정
      setIsNicknameChecked(false); // 닉네임이 비어있으면 중복 검사를 통과하지 않았다고 설정
      alert("공백으로 이름을 설정할 수 없어요 !");
      return;
    } else {
      setIsNicknameEmpty(false);
    }

    // 닉네임의 유효성 검사 실행
    const isValid = await checkNicknameValidity(nickname);
    if (!isValid) {
      setIsNicknameValid(false); // 닉네임이 유효하지 않음
      setIsNicknameChecked(false); // 닉네임이 유효하지 않으면 중복 검사도 통과하지 않았다고 설정
      return; // 유효하지 않으면 함수 중단
    }

    try {
      const response = await axios.post(`https://j10d202.p.ssafy.io/api/users/${userId}/exist/nick-name`, {
        nickName: nickname
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // console.log("이름 변경 성공 ", response.data);
      alert("도깨비 이름이 변경되었어요 !");
      setIsNicknameChecked(true); // 닉네임 검사 통과

      localStorage.setItem('previousNickname', userNickname); // 이전 닉네임 로컬 스토리지에 저장
      setPreviousNickname(userNickname); // 이전 닉네임 상태 업데이트

    } catch (error) {
      console.error("이름 변경 에러", error);
      alert("이미 존재하는 이름이에요 ! 다시 시도해주세요");
    }
  };

  // 정규식 조건을 만족하는지 확인
  const checkNicknameValidity = async (nickname) => {
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

    if (!regex.test(nickname)) {
      alert("이름은 2자 이상 10자 이하의 한글, 영어, 숫자만 사용할 수 있어요!");
      return false;
    }
    
    return true;
  };

  // "저장" 버튼을 통해 닉네임과 이미지를 리덕스 스토어에 저장
  const handleSaveProfile = async () => {
    // 변경 사항이 없는 경우를 체크하기 위한 변수
    const hasNicknameChanged = nickname !== userNickname;
    const hasImageChanged = selectedImage.id !== userProfileImage.id;

    // 닉네임만 바꾸고 중복 확인을 하지 않았을 경우
    if (hasNicknameChanged && !isNicknameChecked) {
      alert("변경 버튼을 눌러 중복 확인을 해주세요!");
      return; // 함수 실행 중단
    }

    // 닉네임 또는 이미지 둘 중 하나라도 변경되지 않은 경우
    if (!hasNicknameChanged && !hasImageChanged) {
      alert("신상이 바뀐 부분이 없어 저장할 수 없어요 ! 뒤로가기를 통해 나가시면 됩니다 !");
      return; // 함수 실행 중단
    }

    // 이미지만 바꼈다면 그 바뀐 이미지를 스토어에 업데이트
    dispatch(setUserProfileImage(selectedImage));
    // 닉네임이 바꼈다면 그 바뀐 닉네임을 스토어에 업데이트
    if (hasNicknameChanged) {
      dispatch(setUserNickname(nickname));
    }

    // 닉네임과 이미지가 모두 설정된 경우에만 실행
    if (nickname && selectedImage) {
      try {
        // 백엔드로 PUT 요청 보내기
        await axios.put(`https://j10d202.p.ssafy.io/api/users/${userId}/info`, {
          nickName: nickname,
          imageId: selectedImage.id, // 변경된 이미지의 ID
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // 리덕스 스토어에 닉네임과 이미지 정보 업데이트
        dispatch(setUserNickname(nickname));
        dispatch(setUserProfileImage(selectedImage));

        alert("도깨비 신상이 성공적으로 업데이트 되었어요 !");
        navigate("/hub");
      } catch (error) {
        console.error("프로필 업데이트 실패", error);
        alert("신상 업데이트 중 오류가 발생했어요. 다시 시도해주세요.");
      }
    } else {
      // 닉네임 또는 이미지가 설정되지 않은 경우 경고
      alert("닉네임과 이미지 모두 설정이 되어야해요 !");
    }
  };

  // 렌더링될 때 로컬 스토리지에서 이전 닉네임 불러오기
  useEffect(() => {
    const storedPreviousNickname = localStorage.getItem('previousNickname');
    if (storedPreviousNickname) {
      setPreviousNickname(storedPreviousNickname);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* 뒤로가기 */}
      <div className='mt-5 flex items-center justify-start'>
        <button
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className='w-48 my-auto'
          onClick={() => navigate("/hub")}
        >
          <img src={isHovering ? BackB : BackA} alt="뒤로가기" className={styles.backButton}/>
        </button>
      </div>

      {/* 프로필 변경 컨테이너 */}
      <div className={`flex flex-col items-center justify-center mx-auto flex-grow mb-20 ${styles.profileContainer}`}>
        {/* 헤더 */}
        <div className='text-white font-bold text-3xl mb-10'>
          <h1>도깨비 신상을 바꾸어보세요 ! </h1>
        </div>
        <div className='flex flex-row w-full'>
          {/* 왼쪽 미리보기 영역 */}
          <div className="flex flex-col items-center justify-center w-1/2 ">
            <h1 className="text-white mb-4 font-bold text-2xl">현재 도깨비</h1>
            <div className={`${styles.previewBox} rounded-lg flex justify-center items-center mb-5`}>
              <img
                src={selectedImage ? selectedImage.src : userProfileImage.src}
                alt={selectedImage ? selectedImage.alt : userProfileImage.alt}
                className="w-40"/>
            </div>
            <button
              onClick={handleOpenModal}
              className="bg-white text-black text-xl font-bold rounded-lg w-1/3">
              도깨비 변경
            </button>
            {isModalOpen && <ChangeModal onClose={handleCloseModal} onSelectImage={(image) => setSelectedImage(image)}/>}
          </div>
          
          {/* 오른쪽 닉네임 변경 영역 */}
          <div className="flex flex-col items-stretch p-5 w-1/2">
            <div className='flex flex-row justify-between mb-5'>
              <h1 className='font-bold text-white text-2xl'>도깨비 이름</h1>
              <h1 className='font-bold text-white text-xl my-auto mr-2'>
                {previousNickname ? `Prev. ${previousNickname}` : "이전 도깨비 이름"}
              </h1>
            </div>
            <div className='flex flex-row justify-between mb-5'>
              <input
                type="text"
                placeholder="닉네임 입력"
                value={nickname}
                maxLength={10}
                className={`${styles.inputBackground} text-center bg-white`}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button
                onClick={handleNicknameChange}
                className="bg-white text-black text-lg font-bold rounded-lg w-1/6">
                <h1 className='text-center'>변 경</h1>
              </button>
            </div>
            {/* <h1 className='font-bold text-white text-xl'>Curr. {nickname}</h1> */}
            <div className='w-full flex justify-end'>
              <div className='flex justify-center items-center'>
                {isNicknameEmpty && <span className={`${styles.nicknameWarning}`}>이름이 입력되지 않았어요 !</span>}
                {!isNicknameEmpty && isNicknameChecked && <span className={`${styles.nicknameOkay}`}>도깨비 이름을 변경했어요 !</span>}
                {!isNicknameValid && !isNicknameChecked && <span className={`${styles.nicknameValid}`}>이름은 2자~10자까지 한글, 영어, 숫자만 !</span>}
              </div>
            </div>
            <h1 className='font-bold text-white text-xl flex justify-center my-auto'>
              반가워요
              <span className='font-bold text-pink-300'>&nbsp;{nickname}&nbsp;</span>
              도깨비님 !
            </h1>
          </div>
        </div>
        
        {/* 저장하기 영역 */}
        <div className='flex justify-center mt-10'>
          <button
            onClick={handleSaveProfile}
            className="bg-white text-black font-bold p-2 rounded-lg w-20"
          >
            저 장
          </button>
        </div>
      </div>
    </div>
  );
}