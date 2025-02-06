const express = require('express');
const patientController = require('../controllers/patient.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // Patient routes (protected routes require authentication)
    app.post("/api/patients", authenticate, patientController.createPatient);  // Create patient
    app.get("/api/patients", authenticate, patientController.getAllPatients);  // Get all patients
    app.get("/api/patients/:id", authenticate, patientController.getPatientById);  // Get one patient by ID
    app.put('/api/patients/:id', authenticate, patientController.updatePatient);  // Update patient by ID
    app.delete("/api/patients/:id", authenticate, patientController.deletePatient);  // Delete patient by ID
};
