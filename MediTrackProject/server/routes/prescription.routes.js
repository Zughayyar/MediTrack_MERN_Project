const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

// Prescription routes (protected routes require authentication)
router.post("/prescriptions", authenticate, prescriptionController.createPrescription);  // Create prescription
router.get("/prescriptions", authenticate, prescriptionController.getAllPrescriptions);  // Get all prescriptions
router.get("/prescriptions/:id", authenticate, prescriptionController.getPrescriptionById);  // Get one prescription by ID
router.put('/prescriptions/:id', authenticate, prescriptionController.updatePrescription);  // Update prescription by ID
router.delete("/prescriptions/:id", authenticate, prescriptionController.deletePrescription);  // Delete prescription by ID

module.exports = (app) => {
    app.use('/api', router);
};
