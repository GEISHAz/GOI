import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getTokens = async() => {
      const accessToken = await searchParams.get("access-token");
      const userId = await searchParams.get("user-id")
      const nextPage = await searchParams.get("next")

      console.log("액세스 토큰 :", accessToken)
      console.log("유저 ID :", userId)
      console.log("nextPage :", nextPage)

      // 액세스 토큰과 userId를 로컬스토리지에 저장
      if (accessToken !== null) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
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