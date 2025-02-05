import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Styles/AdminDashboard.css";
import AdminBar from "./AdminBar";

const AdminDashboard = () => {
    const location = useLocation();
    const path = location.pathname.replace("/", "");

    const data = {
        doctors: [
            { id: 1, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 2, firstname: "John", lastname: "Doe", email: "john@example.com" }
        ],
        nurses: [
            { id: 1, firstname: "Jane", lastname: "Smith", email: "jane@example.com" },
            { id: 2, firstname: "Emily", lastname: "Johnson", email: "emily@example.com" }
        ],
        assistants: [
            { id: 1, firstname: "Robert", lastname: "Brown", email: "robert@example.com" },
            { id: 2, firstname: "Alice", lastname: "Davis", email: "alice@example.com" }
        ]
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(data[path] || []);
    }, [path]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleDelete = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
        if (newItems.length < (currentPage - 1) * itemsPerPage) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <div className="admin-dashboard">
            <AdminBar path={path} />

            <div className="table-container">
                <Link to={`create`}>Create {path}</Link>
                <table style={{ marginTop: "30px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
