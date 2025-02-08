import React, { useState } from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
    const [appointment, setAppointment] = useState('');
    const [prescription, setPrescription] = useState('');
    const [visitNotes, setVisitNotes] = useState('');

    const handleAppointmentChange = (e) => setAppointment(e.target.value);
    const handlePrescriptionChange = (e) => setPrescription(e.target.value);
    const handleVisitNotesChange = (e) => setVisitNotes(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="doctor-dashboard">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="appointment">Schedule Appointment:</label>
                    <input
                        type="datetime-local"
                        id="appointment"
                        value={appointment}
                        onChange={handleAppointmentChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="prescription">Write Prescription:</label>
                    <textarea
                        id="prescription"
                        value={prescription}
                        onChange={handlePrescriptionChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="visitNotes">Visit Notes:</label>
                    <textarea
                        id="visitNotes"
                        value={visitNotes}
                        onChange={handleVisitNotesChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default DoctorDashboard;
