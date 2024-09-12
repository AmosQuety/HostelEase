import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import "./SignUp.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import GoogleSignUpButton from "./GoogleSignUpButton";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const HandleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name || !email || !password) {
        throw new Error("Please fill out all fields.");
      }

      // Validate email format
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Invalid email format.");
      }

      // Validate password strength (e.g., minimum length)
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      toast.success("Verification email sent! Please check your inbox.");

      // Set display name
      await updateProfile(user, {
        displayName: name,
      });

      toast.success("Signup successful!");
      // navigate("/check-email");
      navigate("/login");
    } catch (error: any) {
      // Handle specific error codes from Firebase
      if (error.code === "auth/invalid-email") {
        toast.error("The email address is badly formatted.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use by another account.");
      } else if (error.code === "auth/weak-password") {
        toast.error("The password is too weak.");
      } else {
        toast.error("Signup failed: " + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 rounded-xl first-class">
      <Card
        color="transparent"
        shadow={false}
        className="p-8 bg-white rounded-lg shadow-lg class"
      >
        <div className="gap-3">
          <h3 className="font-bold text-xl text-center">Register Here</h3>
        </div>
        <div className="mt-8 mb-2 w-full max-w-md">
          <div className="mb-6 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="gap-4">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={HandleSignUp}>
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?
              <Link to="/login" className="font-medium text-blue-800 ml-2">
                Login
              </Link>
            </Typography>
            <br />
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <br />
            <GoogleSignUpButton />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
