import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CourseDetails";
import { PageNotFound } from "./pages/PageNotFound";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { userApi } from "./UserApi";
import { Account } from "./pages/Account";
import { Unauthorized } from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const initAdmin = async () => {
      try {
        const response = await fetch(`${userApi}/profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          setUser(jsonData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    initAdmin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="account" element={<Account />} />
          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path=":id" element={<CourseDetails />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
