import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import "./GoogleLoginButton.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null; // Optional
  emailVerified?: boolean;
}

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken(true);
      try {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          lastSignIn: new Date().toISOString(),
        };

        // First, try to create the user
        let response = await fetch(
          "http://localhost:5000/api/users/createUsers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.status === 400) {
          // User already exists, update the user
          response = await fetch("http://localhost:5000/api/users/updateUser", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(userData),
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User sync successful:", data);
      } catch (error) {
        console.error("Error syncing user:", error);
      }

      // const userData = {
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      //   photoURL: user.photoURL || "",
      //   emailVerified: user.emailVerified,
      //   createdAt: new Date().toISOString(),
      //   lastSignIn: new Date().toISOString(),
      // };

      // const idToken = await user.getIdToken(true);

      // // Send user data to backend
      // await fetch("http://localhost:5000/api/users/updateUser", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${idToken}`,
      //   },
      //   body: JSON.stringify(userData),
      // });

      toast.success("Google login successful!");
      navigate("/profile");
    } catch (error: any) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          toast.error("Login popup was closed before completing.");
          break;
        case "auth/popup-blocked":
          toast.error(
            "Login popup was blocked. Please allow popups for this site."
          );
          break;
        case "auth/account-exists-with-different-credential":
          toast.error(
            "An account already exists with the same email address. Please use the original sign-in method."
          );
          break;
        default:
          toast.error("Google login failed: " + error.message);
      }
    }
  };

  return (
    <button className="google-login-button" onClick={handleGoogleLogin}>
      <img src="assets/google.png" alt="Google Logo" className="google-logo" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
