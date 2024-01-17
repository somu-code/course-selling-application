import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="Layout-div">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
