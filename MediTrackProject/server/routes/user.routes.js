const Users = require('../controllers/user.controller');
const User = require('../models/user.model'); // Import User model
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // User routes
    app.post("/api/register", async (req, res, next) => {
        const userCount = await User.countDocuments(); // Use User model to count documents
        if (userCount > 0) {
            return authenticate(req, res, next);
        }
        next();
    }, Users.register);  // Register route (conditionally protected)
    app.post("/api/login", Users.login);  // Login route
    app.post("/api/logout", authenticate, Users.logout);  // Logout route (protected)

    // Protected route (requires authentication)
    app.get("/api/users", authenticate, Users.getAllUsers);  // Get all users route

    // CRUD routes (protected routes require authentication)
    app.get("/api/user/:id", authenticate, Users.getUserById);  // Get one user by ID
    app.put("/api/user/:id", authenticate, Users.updateUserById);  // Update user by ID
    app.delete("/api/user/:id", authenticate, Users.deleteUserById);  // Delete user by ID
};