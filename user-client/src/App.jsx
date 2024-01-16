import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CourseDetails";
import { PageNotFound } from "./pages/PageNotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="courses">
          <Route index element={<Courses />} />
          <Route path=":id" element={<CourseDetails />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
