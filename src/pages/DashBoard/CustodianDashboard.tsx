import React from "react";
import { Link } from "react-router-dom";

const CustodianDashboard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-screen-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
          Custodian Dashboard
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/hostels"
            className="block p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600"
          >
            Manage Hostels
          </Link>
          <Link
            to="/bookings"
            className="block p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
          >
            View Bookings
          </Link>
          <Link
            to="/maintenance"
            className="block p-4 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600"
          >
            Maintenance Requests
          </Link>
          <Link
            to="/reports"
            className="block p-4 bg-red-500 text-white rounded-lg text-center hover:bg-red-600"
          >
            Generate Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustodianDashboard;
