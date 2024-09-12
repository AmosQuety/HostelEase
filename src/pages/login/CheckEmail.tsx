import React from "react";
import { Link } from "react-router-dom";

const CheckEmail: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          We've sent a verification email to your address.
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Please check your inbox and follow the instructions in the email to
          verify your account.
        </p>
        <p className="text-lg text-gray-600">
          If you don't see the email, check your spam or junk folder, or try
          <Link
            to="/verify-email"
            className="font-medium text-blue-600 hover:text-blue-800 ml-2"
          >
            resending the verification email.
          </Link>
          .
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
