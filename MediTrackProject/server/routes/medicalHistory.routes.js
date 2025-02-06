const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../controllers/medicalHistory.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

// Medical History routes (protected routes require authentication)
router.post("/api/medicalHistories", authenticate, medicalHistoryController.createMedicalHistory);  // Create medical history
router.get("/api/medicalHistories", authenticate, medicalHistoryController.getAllMedicalHistories);  // Get all medical histories
router.get("/api/medicalHistories/:id", authenticate, medicalHistoryController.getMedicalHistoryById);  // Get one medical history by ID
router.put('/api/medicalHistories/:id', authenticate, medicalHistoryController.updateMedicalHistory);  // Update medical history by ID
router.delete("/api/medicalHistories/:id", authenticate, medicalHistoryController.deleteMedicalHistory);  // Delete medical history by ID

module.exports = (app) => {
    app.use('/api', router);
};
