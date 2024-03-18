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

export default function choiceModal({ onClose }) {
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();

  // 선택된 사진 -> dispatch하여 store에 저장
  const handleImageSelect = (image) => {
    setSelectedImage(image);
    dispatch(setUserProfileImage(image));
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