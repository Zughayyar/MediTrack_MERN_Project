import { useEffect } from "react";
import { Col, Layout } from "antd";
import "../styles/PatientDashboard.css";
import MediTrackerLogo from "../images/MediTracker.png";
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from "../components/users/AuthContext.jsx";
import {useNavigate, Outlet} from "react-router-dom"; // Import useLocation
import axios from "axios";
const { Header, Content, Footer } = Layout;

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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

        if (user) {
            checkUserRole().then();
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