import { adminApi } from "./AdminApi";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import AddCourse from "./pages/AddCourse";
import Courses from "./pages/Courses";
import Account from "./pages/Account";
import CourseDetails from "./pages/CourseDetails";
import UpdateCourse from "./pages/UpdateCourse";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import { adminState } from "./store/atoms/admin";
import { useSetRecoilState } from "recoil";
import { Routes, Route } from "react-router-dom";

function App() {
  const setAdmin = useSetRecoilState(adminState);
  useEffect(() => {
    const initAdmin = async () => {
      try {
        const response = await fetch(`${adminApi}/profile`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const jsonData = await response.json();
          const responseEmail = jsonData.email;
          setAdmin({
            adminEmail: responseEmail,
            isAuthenticated: true,
          });
        } else {
          setAdmin({
            adminEmail: null,
          });
        }
      } catch (error) {
        console.error(error);
        setAdmin({
          adminEmail: null,
        });
      }
    };
    initAdmin();
  }, []);

  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="admin/signup" element={<Signup />} />
          <Route path="admin/signin" element={<Signin />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="admin/add-course" element={<AddCourse />} />
            <Route path="admin/courses" element={<Courses />} />
            <Route path="admin/course/:id" element={<CourseDetails />} />
            <Route path="admin/update-course/:id" element={<UpdateCourse />} />
            <Route path="admin/account" element={<Account />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
