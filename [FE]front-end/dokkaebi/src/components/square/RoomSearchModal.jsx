import React, { useState } from 'react';
import styles from './RoomSearchModal.module.css';


export default function RoomSearchModal() {
    return (
        <div className={styles.background}>
          {/* 모달 컨테이너 */}
          <div className={`${styles.container} flex flex-col items-center justify-center`}>
            {/* 모달 타이틀 */}
            <h1 className="font-Bit text-4xl mb-10">방 찾기</h1>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              placeholder="방 번호 입력"
              className="border-2 border-gray-300 p-1 w-48"
            />
            
            {/* 버튼 그룹 */}
            <div className="flex justify-center w-full mt-5">
            {/* 확인 버튼 */}
            <button
              className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="button"
            >
            입장
            </button>

            {/* 취소 버튼 */}
            <button
              //  onClick={onClose}
              className="w-24 h-12 bg-red-500 hover:bg-red-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
              type="button"
            >
             취소
            </button>
            </div>
          </div>
        </div>
      );
    }
    


// export default function RoomSearchModal({ onClose, userName }) {
//   const [isPrivate, setIsPrivate] = useState(false); // 비공개 체크박스의 상태를 위한 훅
//   const [password, setPassword] = useState(''); // 비밀번호 상태를 위한 훅

//   const handlePrivateChange = (e) => { // 체크박스 상태 변경 함수
//     setIsPrivate(e.target.checked);
//   };

//   // 비밀번호 숫자 4자리로 제한 
//     // 입력값이 숫자이고 4자리 이하인지 확인
//     const value = e.target.value;
//     if (/^\d{0,4}$/.test(value)) { // 정규표현식을 사용하여 검증
//       // 상태 업데이트 로직
//       setPassword(value); // 상태 업데이트
//     }
//   };


//   return (
//     <div className={styles.background}>
//       {/* 모달 컨테이너 */}
//       <div className={`${styles.container} flex flex-col items-center justify-center`}>
        
//         {/* 모달 타이틀 */}
//         <h1 className="font-Bit text-4xl mb-10">방 만들기</h1>

//         {/* 방 만들기 인풋 그리드 */}
//         <div className="grid grid-cols-2 grid-rows-4 gap-2 w-full mb-4 mr-40">
            
//           {/* 방 번호 */}
//           <div className="flex justify-end items-center">
//             <label htmlFor="roomNumber" className="text-2xl mr-2">방 번호</label>
//           </div>
//           <div>
//             <input
//               type="text"
//               id="roomNumber"
//               name="roomNumber"
//               value="1001"
//               disabled
//               className="border-2 border-gray-300 p-1"
//             />
//           </div>

//           {/* 방 제목 */}
//           <div className="flex justify-end items-center">
//             <label htmlFor="roomTitle" className="text-2xl mr-2">방 제목</label>
//           </div>
//           <div>
//             <input
//               type="text"
//               id="roomTitle"
//               name="roomTitle"
//               placeholder={`${userName}의 방`}
//               className="border-2 border-gray-300 p-1"
//             />
//           </div>

//           {/* 비공개 */}
//           <div className="flex justify-end items-center">
            
//             <label htmlFor="roomPrivate" className="text-2xl mr-2">비공개</label>
//           </div>
//           <div className="flex items-center">
//           <img src={isPrivate ? lock : unlocked} alt={isPrivate ? "Locked" : "Unlocked"} className="w-10 h-auto mr-2" />
//             <input
//               type="checkbox"
//               id="roomPrivate"
//               name="roomPrivate"
//               className="mr-2"
//               onChange={handlePrivateChange}
//             />
            
//             {isPrivate && (
//               <input
//                 type="text"
//                 id="roomPassword"
//                 name="roomPassword"
//                 placeholder="비밀번호 입력"
//                 value={password} // 입력 상태와 바인딩
//                 onChange={handlePasswordChange} // 입력 처리 함수
//                 className="border-2 border-gray-300 p-1 w-32"
//               />
//             )}
//           </div>

//           {/* 연도 선택 */}
//           <div className="flex justify-end items-center">
//             <label htmlFor="roomNumber" className="text-2xl mr-2">연도 선택</label>
//           </div>
//           <div>
//             <input
//               type="text"
//               id="roomNumber"
//               name="roomNumber"
//               value="1001"
//               disabled
//               className="border-2 border-gray-300 p-1"
//             />
//           </div>
//         </div>

//         {/* 버튼 그룹 */}
//         <div className="flex justify-center w-full mt-5">
//           {/* 확인 버튼 */}
//           <button
//             className="w-24 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
//             type="button"
//           >
//             생성
//           </button>

//           {/* 취소 버튼 */}
//           <button
//             onClick={onClose}
//             className="w-24 h-12 bg-red-500 hover:bg-red-600 text-white text-2xl px-4 rounded-xl focus:outline-none focus:shadow-outline"
//             type="button"
//           >
//             취소
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
