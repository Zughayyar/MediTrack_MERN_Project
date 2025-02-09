import {Card, Table, Form, Button, Select, message, Spin, Divider, Input} from "antd";
import {MedicineBoxOutlined, SearchOutlined} from "@ant-design/icons";
import { Typography } from "antd";
import'../../styles/PractDashboard.css'
import {useEffect, useState} from "react";
import moment from 'moment';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext
import Highlighter from 'react-highlight-words'; // Import Highlighter

const MedicalHistory = () => {
    const { Title } = Typography;
    const [form] = Form.useForm();
    const [isPatientLocked, setIsPatientLocked] = useState(false);
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useOutletContext();
    const [medicalHistories, setMedicalHistories] = useState([]);

    const fetchMedicalHistories = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/medicalHistories', { withCredentials: true });
            setMedicalHistories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('There was an error retrieving the medical histories!', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicalHistories();
    }, []);

    const togglePatientLock = () => {
        setIsPatientLocked(!isPatientLocked);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/patients',
                    { withCredentials: true },
                );

                if (Array.isArray(response.data.patients)) {
                    setPatients(response.data.patients);
                } else {
                    console.error("API returned non-array data:", response.data);
                    setError("Invalid data format from API");
                    message.error("Invalid data format from API");
                }

            } catch (error) {
                console.error("API Error:", error);
                setError("Error fetching users. Please try again later.");
                message.error("Error fetching users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatients().then();
    }, []);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
            render: (patient) => `${patient.firstName} ${patient.lastName}`,
            filters: patients.map(patient => ({
                text: `${patient.firstName} ${patient.lastName}`,
                value: patient._id,
            })),
            onFilter: (value, record) => record.patient._id === value,
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
            render: (practitioner) => `${practitioner.firstName} ${practitioner.lastName}`,
        },
    ];


    const onFinish = async (values) => {
        try {
            await axios.post(
                'http://localhost:8000/api/medicalHistories',
                {
                    date: moment().format('YYYY-MM-DD HH:mm'),
                    patient: values.patient,
                    visitNotes: values.visitNote, // Change this line
                    practitioner: user._id,
                },
                { withCredentials: true }
            );
            message.success('Medical history entry added successfully');
            form.resetFields();
            fetchMedicalHistories(); // Refresh the table data
        } catch (error) {
            console.error("API Error:", error);
            message.error('Error adding medical history entry. Please try again later.');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Spin spinning={loading} tip="Loading...">
            <Card className="dashboard-card" title={<Title level={4}><MedicineBoxOutlined/> Medical History</Title>}>
                <Table 
                    columns={columns} 
                    dataSource={Array.isArray(medicalHistories) ? medicalHistories.map(history => ({ ...history, key: history._id })) : []} 
                    pagination={false} 
                    style={{ marginTop: 20 }} 
                />
                <br/>
                <Divider style={{borderColor: '#7cb305',}}>Add new Entry</Divider>
                <Form form={form} onFinish={onFinish} layout="vertical" style={{ marginTop: 20 }}>
                    <Form.Item name="patient" label="Patient" rules={[{ required: true, message: 'Please select a patient!' }]}>
                        <Select
                            showSearch
                            placeholder="Select a patient"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                String(option.children).toLowerCase().includes(input.toLowerCase())
                            }
                            disabled={isPatientLocked}
                        >
                            {patients.map(patient => (
                                <Select.Option key={patient._id} value={patient._id}>
                                    {patient.firstName} {patient.lastName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={togglePatientLock} style={{ marginTop: 10 }}>
                            {isPatientLocked ? 'Unlock Patient' : 'Lock Patient'}
                        </Button>
                    </Form.Item>
                    <Form.Item name="visitNote" label="Visit Note" rules={[{ required: true, message: 'Please input the visit note!' }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Add Entry</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Spin>
    )
}

export default MedicalHistory;