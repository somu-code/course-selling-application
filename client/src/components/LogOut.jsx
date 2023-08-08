import React from "react";
import { serverApi } from "../ServerApi";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";

function LogOut() {
  const navigate = useNavigate();
  const setAdmin = useSetRecoilState(adminState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${serverApi}/admin/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setAdmin({
          adminEmail: null,
          isAuthenticated: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="bg-[#25DAC5] px-3 py-1 rounded-full"
      onSubmit={handleSubmit}
    >
      <button
        className="text-[#FFFFFF] text-lg font-semibold text-center"
        type="submit"
      >
        Log Out
      </button>
    </form>
  );
}

export default LogOut;
