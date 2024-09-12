import React from "react";

const Settings: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-11/12 h-5/6 mt-0">
        <div className="flex flex-col h-full w-full justify-between">
          <div className="flex flex-col items-center mt-2 h-full">
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
              Settings
            </h2>
            <div className="grid grid-cols-2 mt-2 mb-1 gap-4 h-4/6 w-4/6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-2xl text-center font-semibold text-blue-gray-600 mb-6">
                  Account
                </h3>
                <ul className="list-none text-center">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Change Password
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Update Email
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Account Security
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <h3 className="text-2xl font-semibold text-blue-gray-600 mb-6">
                  Notifications
                </h3>
                <ul className="list-none">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Email Notifications
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Push Notifications
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-gray-800 hover:text-blue-600 block"
                    >
                      Manage Alerts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
