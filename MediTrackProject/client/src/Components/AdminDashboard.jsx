import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/AdminDashboard.css";
import AdminBar from "./AdminBar";

const AdminDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the entity type from the path (e.g., "doctors" from "/admin/doctors")
    const pathSegments = location.pathname.split("/");
    const path = pathSegments[2] || "doctors"; // Default to "doctors" if undefined

    const data = {
        doctors: [
            { id: 1, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 2, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 3, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 4, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 5, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 6, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 7, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 8, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 9, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 10, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 11, firstname: "Sami", lastname: "Daraghmeh", email: "sami@example.com" },
            { id: 12, firstname: "John", lastname: "Doe", email: "john@example.com" },
            { id: 13, firstname: "Alice", lastname: "Green", email: "alice@example.com" }
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
    const [currentPage, setCurrentPage] = useState(1);
    const [isFading, setIsFading] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        setItems(data[path] || []);
        setCurrentPage(1); // Reset pagination on category switch
    }, [path]);

    const handleDelete = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);

        // Ensure pagination stays within valid range
        if ((currentPage - 1) * itemsPerPage >= updatedItems.length) {
            setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
        }
    };

    const handleNavigation = (url) => {
        setIsFading(true);
        setTimeout(() => {
            setIsFading(false);
            navigate(url);
        }, 300);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <div className={`admin-dashboard ${isFading ? "fade-out" : "fade-in"}`}>
            <AdminBar path={path} />

            <div className="table-container">
                <Link 
                    className="create-link" 
                    to={`/admin/${path}/create`} 
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(`/admin/${path}/create`);
                    }}
                >
                    Create {path}
                </Link>

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
                        {currentItems.length > 0 ? (
                            currentItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link 
                                            to={`/admin/${path}/edit/${item.id}`} 
                                            className="edit-link"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavigation(`/admin/${path}/edit/${item.id}`);
                                            }}
                                        >
                                            Edit
                                        </Link> {" "}
                                        <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-data">No {path} available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
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
            )}
        </div>
    );
};

export default AdminDashboard;
