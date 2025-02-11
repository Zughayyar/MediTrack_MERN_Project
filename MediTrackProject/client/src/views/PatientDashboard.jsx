import { useEffect, useState } from "react";
import { Col, Layout, Table, Row } from "antd";
import "../styles/PatientDashboard.css"; 
import MediTrackerLogo from "../images/MediTracker.png";
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from "../components/users/AuthContext.jsx";
import {useNavigate, Outlet} from "react-router-dom"; 
import axios from "axios";
const { Header, Content, Footer } = Layout;
// import moment from 'moment';

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const appointmentColumns = [
            {
                title: 'Practitioner',
                dataIndex: 'practitioner',
                key: 'practitioner',
                render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (date) => moment(date).format('DD-MM-YYYY'),
            },
            {
                title: 'Time',
                dataIndex: 'date',
                key: 'time',
                render: (date) => moment(date).format('HH:mm'),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            },
        ];

    const medicalHistoryColumns = 
        [   {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (date) => moment(date).format('YYYY-MM-DD | HH:mm'), // Change this line
            },
            {
                title: 'Visit Notes',
                dataIndex: 'visitNotes',
                key: 'visitNotes',
            },
            {
                title: 'Practitioner',
                dataIndex: 'practitioner',
                key: 'practitioner',
                render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
            },
        ];
    

    const prescriptionColumns = [
            {
                title: 'Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (date) => moment(date).format('YYYY-MM-DD'),
            },
            {
                title: 'Medications',
                dataIndex: 'medications',
                key: 'medications',
                render: (medications) => medications.join(', '),
            },
            {
                title: 'Practitioner',
                dataIndex: 'practitioner',
                key: 'practitioner',
                render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
            },
        ];

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user || user.role !== "patient") {
                alert("Stop Playing Around!");
                try {
                    await axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true });
                    logout();
                    navigate("/");
                } catch (error) {
                    console.log("Logout failed:", error);
                }
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/appointments/patient/${user._id}`, { withCredentials: true });
                setAppointments(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Failed to fetch appointments:", error);
            }
        };

        const fetchMedicalHistories = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/medicalHistories/patient/${user._id}`, { withCredentials: true });
                setMedicalHistories(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Failed to fetch medical histories:", error);
            }
        };

        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/prescriptions/patient/${user._id}`, { withCredentials: true });
                setPrescriptions(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("No prescriptions found for this patient.");
                } else {
                    console.log("Failed to fetch prescriptions:", error);
                }
            }
        };

        if (user) {
            checkUserRole().then();
            fetchAppointments();
            fetchMedicalHistories();
            fetchPrescriptions();
        }
    }, [user, navigate, logout]);

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-title">
                    <img src={MediTrackerLogo} alt="Logo" className="dashboard-image" />
                    <LogoutButton />
                </div>
            </Header>
            <Layout>
                <Layout className="dashboard-main">
                    <Content className="dashboard-content">
                        <div className="dashboard-welcome-container">
                            {user ? `Welcome, ${user.firstName} ${user.lastName}` : "Loading..."}
                        </div>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Table
                                    dataSource={appointments}
                                    columns={appointmentColumns}
                                    rowKey="_id"
                                    title={() => "Appointments"}
                                />
                            </Col>
                            <Col span={8}>
                                <Table
                                    dataSource={medicalHistories}
                                    columns={medicalHistoryColumns}
                                    rowKey="_id"
                                    title={() => "Medical Histories"}
                                />
                            </Col>
                            <Col span={8}>
                                <Table
                                    dataSource={prescriptions}
                                    columns={prescriptionColumns}
                                    rowKey="_id"
                                    title={() => "Prescriptions"}
                                />
                            </Col>
                        </Row>
                        <Col span={24}>
                            <Outlet/>
                        </Col>
                    </Content>

                    {/* Footer */}
                    <Footer className="footer">MediTracker ©2025</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default PatientDashboard;