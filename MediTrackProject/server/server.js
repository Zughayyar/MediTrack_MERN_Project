require('dotenv').config();
require('./config/mongoose.config');
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const { Server } = require("socket.io");

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/user.routes');
const prescriptionRoutes = require('./routes/prescription.routes');
const medicalHistoryRoutes = require('./routes/medicalHistory.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const chatRoutes = require('./routes/chat.routes');
const messageRoutes = require('./routes/message.routes');


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


userRoutes(app);  // Register user-related routes
prescriptionRoutes(app);  // Register prescription-related routes
medicalHistoryRoutes(app);  // Register medical history-related routes
appointmentRoutes(app);  // Register appointment-related routes
chatRoutes(app);  // Register chat-related routes
messageRoutes(app);  // Register message-related routes

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send({ error: 'Something went wrong' });
});

// Start server
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});