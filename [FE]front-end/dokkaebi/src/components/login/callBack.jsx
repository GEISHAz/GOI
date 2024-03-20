import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../features/login/authSlice";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getTokens = async() => {
      const accessToken = await searchParams.get("access-token");
      // const refreshToken = await searchParams.get("refresh-token");
      const userId = await searchParams.get("user-id")
      const nextPage = await searchParams.get("next")

      console.log("액세스 토큰 :", accessToken)
      console.log("유저 ID :", userId)
      console.log("nextPage :", nextPage)

      // 액세스 토큰과 userId를 로컬스토리지에 저장
      if (accessToken !== null) {
        localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        dispatch(setIsLogin(true));
      }

      if (localStorage.getItem("accessToken")) {
        if (nextPage === "main") {
          return navigate("/")
        } else {
          return navigate("/getUserLogin")
        }
      } else {
        return navigate("/")
      }
    }
    getTokens();
  }, [])
  
  return (
    <div>Loading...</div>
  )
}