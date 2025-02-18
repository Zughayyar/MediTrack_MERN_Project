# MediTracker - Internal Clinic Management System

## 📌 Project Overview
**MediTracker** is an internal clinic management system designed to streamline medical appointments, enhance patient record management, and optimize workflow for healthcare professionals.

The system ensures efficient scheduling, secure medical data handling, and easy prescription management.

## 🚀 Technologies Used
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB
- **Frontend:** React
- **Authentication:** JWT

## 🔑 Key Features
✅ Role-based access control  
✅ Appointment scheduling & tracking  
✅ Secure medical records management (General history & visit notes)  
✅ Prescription management (Export to PDF, Email)

## 👥 User Roles
- **Practitioner:** Views medical data, schedules appointments, issues prescriptions
- **Nurse:** Views medical data, assists with scheduling
- **Assistant:** Books appointments but has no access to medical records

## 🗄️ Database Structure (MongoDB Schema)
- **Users:** Practitioner, Nurse, Assistant
- **Appointments:** Patient info, Date, Status
- **Medical Records:** General history, Visit notes, Assigned Practitioner
- **Prescriptions:** Patient, Medications, PDF export

