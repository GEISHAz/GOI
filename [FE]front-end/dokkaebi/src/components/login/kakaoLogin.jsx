// import React, { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { userInfoState } from "../../recoil/atoms/userState";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function KakaoLogin() {
//   const [userInfo, setUserInfo] = useRecoilState(userInfoState);
//     const navigate = useNavigate();
//     const PARAMS = new URL(document.location).searchParams;
//     const KAKAO_CODE = PARAMS.get("code");
//     const [accessTokenFetching, setAccessTokenFetching] = useState(false);
 
//     console.log("카카오 인가코드!! :", KAKAO_CODE);

//     const getAccessToken = async () => {
//       console.log("getAccessToken 호출@@")
      
//       if (accessTokenFetching)
//         return;

//       try {
//         setAccessTokenFetching(true);
//         const res = await axios.post(
//           {
//             authorizationCode : KAKAO_CODE,
//           },
//           {
//             headers : {
//               "Content-Type" : "application/json",
//             },
//           }
//         );
//         const accessToken = res.data.accessToken;
//         console.log("res.data를 accessToken에 넣음 :", accessToken)
        
//         setUserInfo({
//           ...userInfo,
//           accessToken: accessToken,
//         });

//         setAccessTokenFetching(false);
//         navigate('/');
//       } catch (err) {
//         console.error("에러 :", err);
//         setAccessTokenFetching(false);
//       }  
//     };

//   useEffect(() => {
//     if (KAKAO_CODE && !userInfo.accessToken) {
//       getAccessToken();
//     }
//   }, [KAKAO_CODE, userInfo]);

//   return (
//     <div>
//       로딩 중입니다 . . .
//     </div>
//   )
// }