import { Route, Navigate } from "react-router-dom";
import Courses from "../pages/Courses";
import AddCourses from "../pages/AddCourse";
import { useRecoilValue } from "recoil";
import { adminAuthenticatedState } from "../store/selectors/isAdminAuthenticated";

function ProtectedRoute({ Courses, AddCourses, ...rest }) {
  const isAuthenticated = useRecoilValue(adminAuthenticatedState);

  return (
    <Route
      {...rest}
      render={(props) => {
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/admin/signin" />
        );
      }}
    />
  );
}

export default ProtectedRoute;
