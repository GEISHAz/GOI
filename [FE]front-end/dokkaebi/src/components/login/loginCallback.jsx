import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function LoginCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function getTokens() {
      const accessToken = await searchParams.get("access-token");
      const userId = await searchParams.get("user-id")
      const nextPage = await searchParams.get("next")

      if (accessToken !== null) {
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("userId", userId)
      }

      if (localStorage.getItem("accessToken")) {
        if (nextPage === "main") {
          return navigate("/")
        } else {
          return navigate("/kakaoLogin")
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