import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AssistantDashboard = () => {
    const [assistantData, setAssistantData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch assistant-specific data
        fetch("/api/assistant/data")
            .then(response => response.json())
            .then(data => setAssistantData(data))
            .catch(error => console.error("Error fetching assistant data:", error));
    }, []);

    if (!assistantData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Assistant Dashboard</h1>
            <p>Welcome, {assistantData.name}</p>
            <p>Email: {assistantData.email}</p>
            <Link to="/assistant/profile">View Profile</Link>
            <Link to="/assistant/settings">Settings</Link>
        </div>
    );
};

export default AssistantDashboard;
