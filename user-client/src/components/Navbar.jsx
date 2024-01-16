import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SignOut } from "./SignOut";

export function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <header>
      <nav className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto] items-center px-6 py-3">
        <div className="nav-left text-2xl font-bold text-[#1E0E62]">
          <Link to={"/"}>Coursera</Link>
        </div>
        <div className="nav-center">
          <ul className="flex flex-row gap-4 font-medium items-center">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"courses"}>Courses</Link>
            </li>
          </ul>
        </div>
        <div className="nav-right flex flex-row justify-end">
          {user ? (
            <ul className="flex flex-row gap-2 font-medium text-lg itmes-center">
              <li>Account</li>
              <li>
                <SignOut />
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row gap-2 font-medium text-lg items-center">
              <li>
                <Link to={"signup"}>
                  <button>Sign Up</button>
                </Link>
              </li>
              <li>
                <Link to={"signin"}>
                  <button className="bg-[#25DAC5] text-[#ffffff] font-semibold px-3 py-1 rounded-full">
                    Sign In
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
