import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { applyActionCode, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebase"; // Ensure the path is correct

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const oobCode = query.get("oobCode");

        if (!oobCode) {
          throw new Error("Invalid verification link.");
        }

        // Confirm the email verification
        await applyActionCode(auth, oobCode);

        toast.success("Email verification successful! You can now log in.");

        // Redirect to the login page
        navigate("/login");
      } catch (error: any) {
        toast.error("Email verification failed: " + error.message);
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return <div>Verifying your email...</div>;
};

export default EmailVerification;
