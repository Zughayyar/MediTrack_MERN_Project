import React from "react";
import { Link, useNavigate } from "react-router-dom";
import myImage from "../Pics/undefined.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Styles/AdminDashboard.css";
import "../Styles/Login.css";

const AdminBar = ({ path }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="top-bar">
            <img src={myImage} alt="Logo" className="logo" />
            <h1 style={{ marginLeft: "10%" }}>Admin Dashboard</h1>
            <div className="nav-links">
                <Link 
                    to="/admin/doctors" 
                    className={path.includes("doctors") ? "nav-link-active" : "nav-link"}
                >
                    <i className="fas fa-user-md"></i> Doctors
                </Link>
                <Link 
                    to="/admin/nurses" 
                    className={path.includes("nurses") ? "nav-link-active" : "nav-link"}
                >
                    <i className="fas fa-user-nurse"></i> Nurses
                </Link>
                <Link 
                    to="/admin/assistants" 
                    className={path.includes("assistants") ? "nav-link-active" : "nav-link"}
                >
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
