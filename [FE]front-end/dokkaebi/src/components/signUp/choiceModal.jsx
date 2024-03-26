import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserProfileImage } from '../../features/login/authSlice';
import blue from '../../images/signUp/blue.gif';
import brown from '../../images/signUp/brown.gif';
import green from '../../images/signUp/green.gif';
import yellow from '../../images/signUp/yellow.gif';
import pink from '../../images/signUp/pink.gif';
import orange from '../../images/signUp/orange.gif';
import styles from './getUserLogin.module.css';
import axios from 'axios';

export default function choiceModal({ onClose }) {
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");
  const accessToken = sessionStorage.getItem("accessToken");

  // 이미지들에게 번호 부여
  const images = [
    { id: 1, src: blue, alt: "파랑도깨비" },
    { id: 2, src: brown, alt: "밤색도깨비" },
    { id: 3, src: yellow, alt: "노랑도깨비" },
    { id: 4, src: pink, alt: "핑크도깨비" },
    { id: 5, src: orange, alt: "오렌지도깨비" },
    { id: 6, src: green, alt: "초록도깨비" },
  ];

  // 선택된 사진 -> dispatch하여 store에 저장
  const handleImageSelect = async (selectedSrc) => {
    const selectedImageObj = images.find(image => image.src === selectedSrc);
  
    if (!selectedImageObj) {
      console.error('선택된 이미지를 찾을 수 없어요 !');
      return;
    }

    setSelectedImage(selectedSrc);
    dispatch(setUserProfileImage(selectedImageObj));

    try {
      // console.log("userId 확인 :", userId)
      // console.log("accessToken 확인 :", accessToken)
      const response = await axios.put(`https://j10d202.p.ssafy.io/api/users/${userId}/image-id`, {
        imageId: selectedImageObj.id
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log("보낸 이미지 id 확인 :", selectedImageObj.id)
      console.log('프로필 이미지 선택 완료', response.data);
    } catch (error) {
      console.error('프로필 이미지 선택 실패', error);
      alert("이미지 선택에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black/85 p-5 rounded-lg w-1/2">
        {/* 모달 헤더 */}
        <h1 className="text-3xl text-center text-white mb-10 font-bold">도깨비 변경</h1>        
        <div className="flex justify-between items-center mb-5">
          {/* 왼쪽 미리보기 영역 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-white mb-4 font-bold">미리보기</p>
            <div className={`${styles.previewBoxModal} bg-white rounded-lg flex justify-center items-center`}>
              {selectedImage &&
              <img
                src={selectedImage}
                alt="미리보기"
                className="max-w-full max-h-full"/>}
            </div>
          </div>
          
          {/* 오른쪽 이미지 선택 영역 */}
          <div className="flex-1 grid grid-cols-3 gap-0 mr-10">
            {[blue, brown, yellow, pink, orange, green].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`도깨비-${index}`}
                className={`w-full h-32 cursor-pointer border-2 ${selectedImage === image ? 'border-4 border-green-700' : 'border-white'}`}
                onClick={() => handleImageSelect(image)}/>
            ))}
          </div>
        </div>

        {/* 하단 중앙 "선택" 버튼 */}
        <div className="flex justify-center text-center mt-10">
          <button
            onClick={onClose}
            className="bg-white w-24 h-10 font-bold text-black rounded"
          >
            선 택
          </button>
        </div>
      </div>
    </div>
  )
}