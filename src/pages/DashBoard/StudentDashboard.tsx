import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
          Student Dashboard
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/hostels"
            className="block p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
          >
            Find Hostels
          </Link>
          <Link
            to="/bookings"
            className="block p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
          >
            My Bookings
          </Link>
          <Link
            to="/notifications"
            className="block p-4 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600"
          >
            Notifications
          </Link>
          <Link
            to="/profile"
            className="block p-4 bg-purple-500 text-white rounded-lg text-center hover:bg-purple-600"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
