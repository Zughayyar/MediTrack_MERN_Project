const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

// Patient routes (protected routes require authentication)
router.post("/patients", authenticate, patientController.createPatient);  // Create patient
router.get("/patients", authenticate, patientController.getAllPatients);  // Get all patients
router.get("/patients/:id", authenticate, patientController.getPatientById);  // Get one patient by ID
router.put('/patients/:id', authenticate, patientController.updatePatient);  // Update patient by ID
router.delete("/patients/:id", authenticate, patientController.deletePatient);  // Delete patient by ID

module.exports = (app) => {
    app.use('/api', router);
};
