const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // User routes
    app.post("/api/register", Users.register);  // Register route
    app.post("/api/login", Users.login);  // Login route
    app.post("/api/logout", Users.logout);  // Logout route

    // Protected route (requires authentication)
    app.get("/api/users", authenticate, Users.getAllUsers);  // Get all users route

    // CRUD routes (protected routes require authentication)
    app.get("/api/user/:id", authenticate, Users.getUserById);  // Get one user by ID
    app.put("/api/user/:id", authenticate, Users.updateUserById);  // Update user by ID
    app.delete("/api/user/:id", authenticate, Users.deleteUserById);  // Delete user by ID
};