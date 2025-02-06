import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import CreateUsers from "./Components/CreateUsers";
import EditUsers from "./Components/EditUsers";
// import DoctorDashboard from "./Components/DoctorDashboard";
import NurseDashboard from "./Components/NurseDashboard";
import AssistantDashboard from "./Components/AssistantDashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                
                {/* Redirect root to /login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />

                {/* Admin routes */}
                <Route path="/admin/doctors" element={<AdminDashboard />} />
                <Route path="/admin/nurses" element={<AdminDashboard />} />
                <Route path="/admin/assistants" element={<AdminDashboard />} />

                <Route path="/admin/doctors/create" element={<CreateUsers />} />
                <Route path="/admin/nurses/create" element={<CreateUsers />} />
                <Route path="/admin/assistants/create" element={<CreateUsers />} />

                <Route path="/admin/doctors/edit/:id" element={<EditUsers />} />
                <Route path="/admin/nurses/edit/:id" element={<EditUsers />} />
                <Route path="/admin/assistants/edit/:id" element={<EditUsers />} />

                {/* Placeholder for doctor, nurse, assistant routes */}
                {/* <Route path="dashboard/doctor" element={<DoctorDashboard />}/> */}
                <Route path="dashboard/nurse" element={<NurseDashboard />}/>
                <Route path="dashboard/assistant" element={<AssistantDashboard />}/>







            </Routes>
        </Router>
    );
};

export default App;
