import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="all">
      <Header />
      {/* <New /> */}
      <div className="layout">
        <div>
          <Sidebar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
