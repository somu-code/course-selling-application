import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminEmailState } from "../store/selectors/adminEmail";
import { adminApi } from "../AdminApi";
import { adminState } from "../store/atoms/admin";
import { courseState } from "../store/atoms/courses";
import { useNavigate } from "react-router-dom";

function Account() {
  const navigate = useNavigate();
  const adminEmail = useRecoilValue(adminEmailState);
  const setAdmin = useSetRecoilState(adminState);
  const setCourse = useSetRecoilState(courseState);
  const deleteAccount = async () => {
    const value = confirm(
      "This action will permanently delete your account along with all the courses. Are you sure?"
    );
    if (!value) {
      return;
    }
    try {
      const response = await fetch(`${adminApi}/delete-account`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const jsonData = response.json();
        setAdmin({
          adminEmail: null,
          isAuthenticated: false,
        });
        setCourse([]);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <p className="text-center text-2xl font-medium mt-12">
        <span>Email: </span>
        <span>{adminEmail}</span>
      </p>
      <div className="bg-[#25DAC5] rounded-full mx-auto text-center mt-6 w-64">
        <button
          className="text-[#FFFFFF] text-lg font-semibold px-3 py-1 w-full"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

export default Account;
