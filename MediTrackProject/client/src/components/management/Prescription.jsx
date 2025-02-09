import {Card} from "antd";
import {DiffOutlined} from "@ant-design/icons";
import { Typography } from "antd";


const Prescription = () => {
    const {Title, Text} = Typography;

    return (
        <Card className="dashboard-card" title={<Title level={4}><DiffOutlined/> Prescriptions</Title>}>
            <Text>Create and manage patient prescriptions.</Text>
        </Card>
    )
}

export default Prescription;