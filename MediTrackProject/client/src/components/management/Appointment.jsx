import { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Typography } from 'antd';
import { CalendarOutlined } from "@ant-design/icons";
import axios from 'axios';
const { Title } = Typography;

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAppointments().then();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/appointments', {withCredentials: true});
            setAppointments(response.data);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        }
    };

    

    const handleAddAppointment = async (values) => {
        try {
            await axios.post('/api/appointments', values);
            await fetchAppointments();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to add appointment:', error);
        }
    };

    const columns = [
        {
            title: 'Patient',
            dataIndex: 'patient',
            key: 'patient',
        },
        {
            title: 'Practitioner',
            dataIndex: 'practitioner',
            key: 'practitioner',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    return (
        <div>
            <Card className="dashboard-card" title={<Title level={4}><CalendarOutlined /> Schedule Appointments</Title>}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Add Appointment
                </Button>
                <Table columns={columns} dataSource={Array.isArray(appointments) ? appointments : []} rowKey="_id" />
                <Modal
                    title="Add Appointment"
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={handleAddAppointment}>
                        <Form.Item
                            name="patient"
                            label="Patient"
                            rules={[{ required: true, message: 'Please input the patient!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="practitioner"
                            label="Practitioner"
                            rules={[{ required: true, message: 'Please input the practitioner!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[{ required: true, message: 'Please select the date!' }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    );
};

export default Appointment;