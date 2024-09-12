import {
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import "./GoogleSignUpButton.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleSignUpButton = () => {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      localStorage.setItem("userObject", JSON.stringify(userData));

      toast.success("Google sign-up successful!");
      navigate("/profile");
    } catch (error: any) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          toast.error("Sign-up popup was closed before completing.");
          break;
        case "auth/popup-blocked":
          toast.error(
            "Sign-up popup was blocked. Please allow popups for this site."
          );
          break;
        case "auth/account-exists-with-different-credential":
          // Fetch sign-in methods for the existing email
          const email = error.customData.email;
          const methods = await fetchSignInMethodsForEmail(auth, email);
          if (methods.includes("password")) {
            toast.error(
              "An account with this email already exists. Please log in using your email and password."
            );
          } else {
            toast.error(
              "An account with this email already exists. Please use the original sign-in method."
            );
          }
          break;
        default:
          toast.error("Google sign-up failed: " + error.message);
      }
    }
  };

  return (
    <button className="google-login-button" onClick={handleGoogleSignUp}>
      <img src="assets/google.png" alt="Google Logo" className="google-logo" />
      <p className="text-center">Continue with Google</p>
    </button>
  );
};

export default GoogleSignUpButton;
