import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Styles/AdminDashboard.css";
import myImage from "../Pics/undefined.png";

const AdminDashboard = () => {
    // Sample users data (you can fetch from API)
    const [users, setUsers] = useState([
        { id: 1, firstname: "Sami", lastname: "Daraghmeh", email: "john@example.com" , role:"Doctor"},
        { id: 2, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 3, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 4, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 5, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 6, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 7, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 8, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 9, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 10, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 11, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 12, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 13, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 14, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" },
        { id: 15, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com" , role:"Doctor" }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="admin-dashboard">
            <div className="top-bar">
                <img src={myImage} alt="Logo" className="logo" />
                <div className="nav-links">
                    <Link to="/" className="nav-link-active">Admin Dashboard</Link>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                </div>
            </div>

            <div className="table-container">
                <button className="create-btn">Create User</button>
                <table style={{ marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
