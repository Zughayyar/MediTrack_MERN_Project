import {Card} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import { Typography } from "antd";


const Appointment = () => {
    const { Title, Text } = Typography;

    return (
        <div>
            <Card className="dashboard-card" title={<Title level={4}><CalendarOutlined /> Schedule Appointments</Title>}>
                <Text>Manage upcoming patient appointments.</Text>
            </Card>
        </div>
    )
}

export default Appointment;