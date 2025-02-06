const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

// Appointment routes (protected routes require authentication)
router.post("/api/appointments", authenticate, appointmentController.createAppointment);  // Create appointment
router.get("/api/appointments", authenticate, appointmentController.getAllAppointments);  // Get all appointments
router.get("/api/appointments/:id", authenticate, appointmentController.getAppointmentById);  // Get one appointment by ID
router.put('/api/appointments/:id', authenticate, appointmentController.updateAppointment);  // Update appointment by ID
router.delete("/api/appointments/:id", authenticate, appointmentController.deleteAppointment);  // Delete appointment by ID

module.exports = (app) => {
    app.use('/api', router);
};
