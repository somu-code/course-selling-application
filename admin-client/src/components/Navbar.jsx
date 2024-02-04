import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminAuthenticatedState } from "../store/selectors/isAdminAuthenticated";
import LogOut from "./LogOut";

function Navbar() {
  const auth = useRecoilValue(adminAuthenticatedState);
  return (
    <header className="">
      <nav className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto] items-center font-medium px-6 py-3">
        <div className="flex flex-row">
          <Link to="/">
            <h2 className="text-[#1E0E62] text-2xl font-bold">Coursera</h2>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Link to="/">
            <div className="">Home</div>
          </Link>
          <Link to="courses">
            <div className="">Courses</div>
          </Link>
          <Link to="add-course">
            <div className="">Add-Course</div>
          </Link>
        </div>
        {auth ? (
          <div className="flex flex-row items-center justify-end gap-2">
            <Link to="account">
              <h2 className="text-lg">Accounts</h2>
            </Link>
            <LogOut />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-end gap-2">
            <Link to="signup">
              <button className="text-[#151439] text-lg">Sign Up</button>
            </Link>
            <Link to="signin">
              <div className="bg-[#25DAC5] px-3 py-1 rounded-full">
                <button className="text-[#FFFFFF] text-lg font-semibold text-center">
                  Sign In
                </button>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
