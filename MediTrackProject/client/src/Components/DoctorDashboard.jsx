import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
    const [doctorInfo, setDoctorInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch doctor information from an API or other source
        fetchDoctorInfo();
    }, []);

    const fetchDoctorInfo = async () => {
        // Replace with actual API call
        const response = await fetch("/api/doctor/info");
        const data = await response.json();
        setDoctorInfo(data);
    };

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <p>Welcome, Dr. {doctorInfo.name}</p>
            <p>Specialization: {doctorInfo.specialization}</p>
            <p>Contact: {doctorInfo.contact}</p>
            <Link to="/appointments">View Appointments</Link>
            <button onClick={() => navigate("/profile")}>Go to Profile</button>
        </div>
    );
};

export default DoctorDashboard;