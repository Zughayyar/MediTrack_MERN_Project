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


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

// Socket.io connection handler
io.on("connection", (socket) => {
    console.log("User connected, socket id=" + socket.id);

    socket.on("sendMessage", async (data) => {
        try {
            // Call the existing createChat function
            const req = { body: data };  // Simulate Express request
            const res = {
                json: (savedChat) => {
                    console.log("Message saved:", savedChat);
                    io.emit("receiveMessage", savedChat); // Send saved message to all clients
                },
                status: () => ({
                    json: (err) => console.error("Error saving message:", err),
                }),
            };

            await ChatController.createChat(req, res);
        } catch (error) {
            console.error("Error handling sendMessage:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected, socket id=" + socket.id);
    });
});


userRoutes(app);  // Register user-related routes
prescriptionRoutes(app);  // Register prescription-related routes
medicalHistoryRoutes(app);  // Register medical history-related routes
appointmentRoutes(app);  // Register appointment-related routes

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send({ error: 'Something went wrong' });
});

// Start server
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});