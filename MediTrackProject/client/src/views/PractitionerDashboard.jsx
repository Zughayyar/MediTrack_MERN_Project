import { useState, useEffect } from "react";
import {Card, Col, Layout, Menu, Row} from "antd";
import { HomeOutlined, CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import '../styles/PractDashboard.css';
import MediTrackerLogo from '../images/MediTracker.png';
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from '../components/users/AuthContext.jsx';
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from "antd";
import axios from "axios";

const PractitionerDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");
    const { Title, Text } = Typography;

    useEffect(() => {
        const checkUserRole = async () => {
            if (!user || user.role !== "practitioner") {
                alert("STOP PLAYING AROUND");
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





    useEffect(() => {
        const path = location.pathname;
        if (path === "/practDashboard" || path === "/practDashboard/home") {
            setSelectedKey("1");
        }
    }, [location.pathname]); // Add location.pathname to dependency array

    const toggleCollapse = () => setCollapsed(!collapsed);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Practitioner Dashboard", // Safe access to user.firstName
            onClick: () => navigate("/practDashboard")
        }
    ];

    return (
        <Layout className="dashboard-layout">
            <Header className="dashboard-header">
                <div className="header-title">
                    <img src={MediTrackerLogo} alt="Logo" className="dashboard-image" />
                    <LogoutButton />
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={toggleCollapse}
                    className="dashboard-sider"
                    width={300}
                >
                    <Menu
                        theme="dark"
                        selectedKeys={[selectedKey]}  // Use selectedKeys (plural)
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
                <Layout className="dashboard-main">
                    <Content className="dashboard-content">
                        <Col span={24}>
                            <Card>
                                <Text>Welcome Dr. {user ? user.firstName : "Guest"}</Text>
                            </Card>
                        </Col>
                        <Row gutter={[16, 16]}>
                            {/* Medical History Section */}
                            <Col span={24}>
                                <Card className="dashboard-card" title={<Title level={4}><FileTextOutlined /> Medical History</Title>}>
                                    <Text>View and update patient medical history.</Text>
                                </Card>
                            </Col>

                            {/* Schedule Appointments Section */}
                            <Col span={24}>
                                <Card className="dashboard-card" title={<Title level={4}><CalendarOutlined /> Schedule Appointments</Title>}>
                                    <Text>Manage upcoming patient appointments.</Text>
                                </Card>
                            </Col>

                            {/* Prescriptions Section */}
                            <Col span={24}>
                                <Card className="dashboard-card" title={<Title level={4}><FileTextOutlined /> Prescriptions</Title>}>
                                    <Text>Create and manage patient prescriptions.</Text>
                                </Card>
                            </Col>
                        </Row>
                    </Content>

                    {/* Footer */}
                    <Footer className="footer">MediTracker ©2025</Footer>
                </Layout>
            </Layout>

        </Layout>
    );
}

export default PractitionerDashboard;