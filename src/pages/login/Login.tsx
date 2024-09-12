import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { auth } from "./firebase";
import {
  browserLocalPersistence,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";

import { Button, Typography } from "@material-tailwind/react";
import GoogleLoginButton from "./GoogleLoginButton";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        throw new Error("Please fill out all fields.");
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Invalid email format.");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email first.");
        await handleResendVerification(user);
        return;
      }

      const idToken = await user.getIdToken(true);

      // Send user data to backend
      await fetch("http://localhost:5000/api/users/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber || "",
          lastSignIn: user.metadata.lastSignInTime,
          createdAt: user.metadata.creationTime,
        }),
      });

      toast.success("Login successful!");
      navigate("/home");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("The email address is badly formatted.");
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-credential":
          toast.error("Invalid credentials provided.");
          break;
        default:
          toast.error("Login failed: " + error.message);
      }
    }
  };

  const handleResendVerification = async (user: User) => {
    try {
      await sendEmailVerification(user);
      toast.success("Verification email resent! Please check your inbox.");
    } catch (error: any) {
      toast.error("Failed to resend verification email: " + error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <h1>Welcome Back</h1>
      </div>
      <div className="login-main">
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doe@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="****"
              required
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link to="/signup" className="font-medium text-blue-800 ml-2">
              SignUp
            </Link>
          </Typography>
          <br />
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="px-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <br />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
