import {Table, Spin, message} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import { fetchPatients } from "./PatientsList.jsx";
import moment from "moment";

const MedicalHistoryList = () => {
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);


    useEffect(() => {
        const fetchPatientsData = async () => {
            const patientsData = await fetchPatients();
            setPatients(patientsData);
            setLoading(false);
        };

        fetchPatientsData().then();
    }, []);

    useEffect(() => {
        const fetchMedicalHistories = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8000/api/medicalHistories',
                    { withCredentials: true },
                );

                if (Array.isArray(response.data)) {
                    setMedicalHistories(response.data);
                } else {
                    console.error("API returned non-array data:", response.data);
                    message.error("Invalid data format from API");

                }
            } catch (error) {
                console.error("API Error:", error);
                message.error("Error fetching medical histories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMedicalHistories().then();
    }, []);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => moment(date).format('YYYY-MM-DD | HH:mm'), // Change this line
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
            render: (practitioner) => practitioner ? `${practitioner.firstName} ${practitioner.lastName}` : 'Unknown Practitioner',
        },
    ];

    return (
        <Spin spinning={loading} tip="Loading...">
            <Table
                columns={columns}
                dataSource={Array.isArray(medicalHistories) ? medicalHistories.map(history => ({ ...history, key: history._id })) : []}
                pagination={false}
                style={{ marginTop: 20 }}
            />
        </Spin>
    );
}

export default MedicalHistoryList;