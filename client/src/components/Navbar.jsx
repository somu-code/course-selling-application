import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverApi } from "../ServerApi";
import { adminState } from "../store/atoms/admin";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { adminLoadingState } from "../store/selectors/isAdminLoading";
import { adminEmailState } from "../store/selectors/adminEmail";

function Navbar() {
  const adminLoading = useRecoilValue(adminLoadingState);
  const adminEmail = useRecoilValue(adminEmailState);
  console.log(adminEmail);
  return (
    <header className="">
      <nav className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto] items-center font-medium px-6 py-3">
        <Link to="/">
          <div className="text-[#1E0E62] text-2xl font-bold">Coursera</div>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link to="/">
            <div className="">Home</div>
          </Link>
          <Link to="/admin/courses">
            <div className="">Courses</div>
          </Link>
          <Link to="/admin/add-course">
            <div className="">Add-Course</div>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          {adminEmail ? (
            <h2 className="text-lg">{adminEmail}</h2>
          ) : (
            <Link to="/admin/signup">
              <button className="text-[#151439] text-lg">Sign Up</button>
            </Link>
          )}
          <Link to="/admin/signin">
            <div className="bg-[#25DAC5] px-3 py-1 rounded-full">
              <button className="text-[#FFFFFF] text-lg font-semibold text-center">
                Sign In
              </button>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
