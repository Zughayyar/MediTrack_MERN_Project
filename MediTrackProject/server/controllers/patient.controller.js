const Patient = require('../models/patient.model');

// Create Patient
exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get One Patient
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Patient
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.status(200).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};