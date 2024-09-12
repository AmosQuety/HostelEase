import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layout/LayoutFold/Layout";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Register from "../pages/login/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Booking from "../pages/booking/Booking";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import Inbox from "../pages/inbox/Inbox";
import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";
import CustodianDashboard from "../pages/DashBoard/CustodianDashboard";
import StudentDashboard from "../pages/DashBoard/StudentDashboard";
import Try from "../pages/login/Try";
import CheckOut from "../pages/booking/CheckOut";
import GoogleLoginButton from "../pages/login/GoogleLoginButton";
import GoogleSignUpButton from "../pages/login/GoogleSignUpButton";
import EmailVerification from "../pages/login/EmailVerification";
import CheckEmail from "../pages/login/CheckEmail";
import HostelList from "../pages/hostel/HostelList";
import Hostel from "../pages/hostel/Hostel";
import About from "../pages/About";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/custodian" element={<CustodianDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/hostel-list" element={<HostelList />} />
          <Route path="/hostels" element={<Hostel />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/google-login" element={<GoogleLoginButton />} />
        <Route path="/google-signup" element={<GoogleSignUpButton />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/try" element={<Try />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
