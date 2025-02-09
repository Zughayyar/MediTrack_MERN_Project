import {Card} from "antd";
import {MedicineBoxOutlined} from "@ant-design/icons";
import { Typography } from "antd";


const MedicalHistory = () => {
    const { Title, Text } = Typography;
    return (
        <div>
            <Card className="dashboard-card" title={<Title level={4}><MedicineBoxOutlined/> Medical History</Title>}>
                <Text>View and update patient medical history.</Text>
            </Card>
        </div>
    )
}

export default MedicalHistory;