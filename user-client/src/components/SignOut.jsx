import { userApi } from "../UserApi";

export function SignOut() {
  const signOut = async () => {
    try {
      await fetch(`${userApi}/signoff`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="bg-[#25DAC5] text-[#ffffff] font-semibold px-3 py-1 rounded-full" onClick={signOut}>Sign Out</button>
  )
}
