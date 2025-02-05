import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import CreateUsers from "./Components/CreateUsers";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/doctors" element={<AdminDashboard />} />
                <Route path="/nurses" element={<AdminDashboard />} />
                <Route path="/assistants" element={<AdminDashboard />} />
                <Route path="/doctors/create" element={<CreateUsers />} />
                <Route path="/assistants/create" element={<CreateUsers />} />
                <Route path="/nurses/create" element={<CreateUsers />} />
            </Routes>
        </Router>
    );
};

export default App;
