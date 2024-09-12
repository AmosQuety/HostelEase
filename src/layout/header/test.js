import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const userObject = JSON.parse(localStorage.getItem("userObject"));
  const username = userObject ? userObject.name : "";

  // console.log("User Object from local storage:", userObject);
  // console.log("Username:", username);

  const listItems = [
    { text: "Home", to: "/" },
    { text: "Hostels", to: "/hostels" },
    { text: "About", to: "/about" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userObject");
    navigate("/login");
  };

  return (
    <div className="header-section">
      <div>
        <h3 className="text-3xl font-bold">HostelEase</h3>
      </div>

      <div className="list-div">
        <ul className="item-list">
          {listItems.map((item, id) => (
            <li className="list" key={id}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="user-section">
        <div className="user-info">
          <img
            src="user-profile-icon.png"
            width="40px"
            height="30px"
            alt="User Profile"
          ></img>
        </div>
        <span className="username">{username}</span>
        <div className="button-div">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
