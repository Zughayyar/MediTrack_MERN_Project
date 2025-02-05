import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Styles/AdminDashboard.css";
import myImage from "../Pics/undefined.png";

const AdminDashboard = () => {
    // Sample doctors data (you can fetch from API)
    const [doctors, setdoctors] = useState([
        { id: 1, firstname: "Sami", lastname: "Daraghmeh", email: "john@example.com"  },
        { id: 2, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 3, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 4, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 5, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 6, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 7, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 8, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 9, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 10, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 11, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 12, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 13, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 14, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   },
        { id: 15, firstname: "Sami", lastname: "Daraghmeh" , email: "john@example.com"   }
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 10;

    const handleDelete = (id) => {
        setdoctors(doctors.filter(doctor => doctor.id !== id));
    };

    const indexOfLastdoctor = currentPage * doctorsPerPage;
    const indexOfFirstdoctor = indexOfLastdoctor - doctorsPerPage;
    const currentdoctors = doctors.slice(indexOfFirstdoctor, indexOfLastdoctor);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(doctors.length / doctorsPerPage);

    return (
        <div className="admin-dashboard">
            <div className="top-bar">
                <img src={myImage} alt="Logo" className="logo" />
                <h1>Admin Dashboard</h1>
                <div className="nav-links">
                    <Link to="/doctors" className="nav-link-active">Doctors</Link>
                    <Link to="/nurses" className="nav-link-active">Nurses</Link>
                    <Link to="/assistants" className="nav-link-active">Assistants</Link>
                    <Link to="/login" className="nav-link-active">Logout</Link>
                </div>
            </div>

            <div className="table-container">
                <button className="create-btn">Create doctor</button>
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
                        {currentdoctors.map(doctor => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.firstname}</td>
                                <td>{doctor.lastname}</td>
                                <td>{doctor.email}</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(doctor.id)}>Delete</button>
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
