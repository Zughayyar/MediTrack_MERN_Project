// TopBar.js
import React from "react";
import { Link } from "react-router-dom";
import myImage from "../Pics/undefined.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Styles/AdminDashboard.css"
import "../Styles/Login.css"


const AdminBar = ({ path }) => {
    return (
        <div className="top-bar">
            <img src={myImage} alt="Logo" className="logo" />
            <h1 style={{marginLeft:"10%"}}>Admin Dashboard</h1>
            <div className="nav-links">
                <Link to="/doctors" className={path === "doctors" ? "nav-link-active" : "nav-link"}>
                    <i className="fas fa-user-md"></i> Doctors
                </Link>
                <Link to="/nurses" className={path === "nurses" ? "nav-link-active" : "nav-link"}>
                    <i className="fas fa-user-nurse"></i> Nurses
                </Link>
                <Link to="/assistants" className={path === "assistants" ? "nav-link-active" : "nav-link"}>
                    <i className="fas fa-user-tie"></i> Assistants
                </Link>
                <Link to="/login" className="nav-link">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </Link>
            </div>
        </div>
    );
};

export default AdminBar;
