import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NurseDashboard = () => {
    const [nurseInfo, setNurseInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch nurse information from an API or other source
        fetchNurseInfo();
    }, []);

    const fetchNurseInfo = async () => {
        // Replace with actual API call
        const response = await fetch("/api/nurse/info");
        const data = await response.json();
        setNurseInfo(data);
    };

    return (
        <div>
            <h1>Nurse Dashboard</h1>
            <p>Name: {nurseInfo.name}</p>
            <p>Department: {nurseInfo.department}</p>
            <Link to="/edit-nurse-info">Edit Info</Link>
        </div>
    );
};

export default NurseDashboard;