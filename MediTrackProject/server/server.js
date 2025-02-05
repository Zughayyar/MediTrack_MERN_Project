require('dotenv').config();
require('./config/mongoose.config');  // MongoDB connection
const express = require('express');
const app = express();
const port = process.env.PORT;  // Set a default port in case the env variable is not set
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Import cookie-parser

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your front-end URL
    credentials: true  // Allow sending cookies with requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser middleware

// Routes
const userRoutes = require('./routes/user.routes');
userRoutes(app);  // Register user-related routes

// Error handling middleware
app.use((err, req, res, next) => {  // Add next parameter
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong' });
});

// Start server
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});