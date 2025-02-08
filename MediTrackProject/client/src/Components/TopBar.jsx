import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/TopBar.css";
import logo from "../Pics/undefined.png";

function TopBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="logo">
        <img src={logo} className="img-logo"/>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/about">About Us</Link>
        <Link to="/news">News</Link>
      </nav>
      <div className="auth-buttons">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default TopBar;
