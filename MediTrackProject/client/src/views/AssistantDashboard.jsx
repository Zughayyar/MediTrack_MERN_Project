import React, { useState, useEffect } from "react";
import {Card, Col, Layout, Menu, Row} from "antd";
import { HomeOutlined, CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import '../styles/PractDashboard.css';
import MediTrackerLogo from '../images/MediTracker.png';
import LogoutButton from "../components/users/LogoutButton.jsx";
import { useAuth } from '../components/users/AuthContext.jsx';
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from "antd";

const AssistantDashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");
    const { Title, Text } = Typography;

    useEffect(() => {
        const path = location.pathname;
        if (path === "/assistDashboard" || path === "/assistDashboard/home") {
            setSelectedKey("1");
        }
    }, [location.pathname]); // Add location.pathname to dependency array

    const toggleCollapse = () => setCollapsed(!collapsed);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined />,
            label: "Assistant Dashboard", // Safe access to user.firstName
            onClick: () => navigate("/assistDashboard")
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
                                <Text>Welcome Assistant, {user.firstName} {user.lastName}</Text>
                            </Card>
                        </Col>
                        <Row gutter={[16, 16]}>

                            {/* Schedule Appointments Section */}
                            <Col span={24}>
                                <Card className="dashboard-card" title={<Title level={4}><CalendarOutlined /> Schedule Appointments</Title>}>
                                    <Text>Manage upcoming patient appointments.</Text>
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

export default AssistantDashboard;