import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsHouseCheckFill } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import {
  MobileNav,
  Button,
  IconButton,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { PowerIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();

  const listItems = [
    { text: "Home", to: "/home", icon: <BsHouseCheckFill /> },
    { text: "Hostels", to: "/hostels", icon: <BsHouseCheckFill /> },
    { text: "About", to: "/about", icon: <FcAbout /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userObject");
    localStorage.removeItem("userPhotoURL"); // Clear photoURL from local storage
    navigate("/login");
  };

  // Retrieve photoURL from local storage
  const photoURL =
    localStorage.getItem("userPhotoURL") || "/assets/default-avatar.png";

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {listItems.map((item, index) => (
        <li key={index}>
          <Link
            to={item.to}
            className="flex items-center gap-x-2 p-1 font-medium text-blue-gray-900 hover:text-blue-500"
          >
            {item.icon}
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      style={{ backgroundColor: "#ABB2B9" }}
      className="w-full bg-blue-gray-50 px-4 py-2 lg:px-8 lg:py-4 border-white border rounded-none"
    >
      <div className="w-full flex items-center justify-between text-blue-gray-900">
        <div className="mr-4 cursor-pointer py-1.5 font">
          <div className="flex items-center space-x-1">
            <div>
              <img
                src="/assets/logos/logo1.png"
                alt="HostelEase Logo"
                className="w-15 h-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">HostelEase</h1>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-4">
          <Link to="/profile">
            <img
              src={photoURL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
            />
          </Link>
          <ListItem className="bg-[burlywood] text-black hover:border hover:border-black flex items-center">
            <ListItemPrefix>
              <PowerIcon className="h-4 w-4" />
            </ListItemPrefix>
            <div>
              <Link to="/login" className="flex items-center w-full gap-1.25">
                Logout
              </Link>
            </div>
          </ListItem>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-4">
            <Link to="/profile">
              <img
                src={photoURL}
                alt="User Avatar"
                className=" w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
              />
            </Link>
            <Button
              fullWidth
              variant="text"
              size="sm"
              className="text-blue-gray-900 hover:text-blue-500"
              onClick={handleLogout}
            >
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </div>
  );
};

export default Header;
