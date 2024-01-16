import { useNavigate } from "react-router-dom";
import { userApi } from "../UserApi";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const signOut = async () => {
    try {
      const response = await fetch(`${userApi}/signoff`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.ok) {
        navigate("signin");
        setUser(null)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="bg-[#25DAC5] text-[#ffffff] font-semibold px-3 py-1 rounded-full" onClick={signOut}>Sign Out</button>
  )
}
