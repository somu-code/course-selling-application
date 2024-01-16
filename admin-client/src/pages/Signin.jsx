import { useState } from "react";
import { adminApi } from "../AdminApi";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { document } from "postcss";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const setAdmin = useSetRecoilState(adminState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${adminApi}/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const cookieFromDocument = document.cookie;
        const adminAccessToken = cookieFromDocument.split("=");
        const adminJWT = adminAccessToken[1];
        const [header, payload, signature] = adminJWT.split(".");
        const jsonData = await response.json();
        const responseEmail = jsonData.email;
        setAdmin({
          adminEmail: responseEmail,
          isAuthenticated: true,
        });
        navigate("/");
      }
      if (response.status === 401 || response.status === 404) {
        setVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-[90vh] flex flex-row justify-center items-center">
      <div className="w-[430px] bg-slate-300 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="mx-auto py-8 flex flex-col gap-5 w-[330px]"
        >
          <h3 className="text-center font-bold text-[#1E0E62] text-4xl mb-6">
            Sign In
          </h3>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="pl-2 py-2 rounded-md focus:outline-blue-500"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="pl-2 py-2 rounded-md focus:outline-blue-500"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          {visible ? (
            <p className="text-center text-red-500 font-medium">
              Invalid email or password
            </p>
          ) : null}
          <button
            type="submit"
            className="bg-[#2866df] text-white font-semibold py-2 rounded-md hover:bg-[#215ac8]"
          >
            Sign In
          </button>
        </form>
        <div className="flex flex-row justify-center pb-5">
          <Link to="/admin/signup">
            <p className="font-medium">Don't have an account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
