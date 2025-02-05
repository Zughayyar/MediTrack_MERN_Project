const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
    );
}

module.exports = {
    // Register user (registration)
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const user = new User({ name, email, password, role });
            await user.save();

            // Generate JWT token
            const token = generateToken(user);

            // Send response with token
            res
                .cookie('usertoken', token, { httpOnly: true })
                .status(201)
                .json({ message: 'User registered successfully', user });
        } catch (err) {
            res.status(500).json({ message: 'Error registering user', error: err });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Compare password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = generateToken(user);

            // Send response with token
            res
                .cookie('usertoken', token, { httpOnly: true })
                .status(200)
                .json({ message: 'Login successful', user });
        } catch (err) {
            res.status(500).json({ message: 'Error logging in user', error: err });
        }
    },

    // Logout user
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.status(200).json({ message: 'Logged out successfully' });
    },

    // Get all users (admin only)
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (err) {
            res.status(500).json({ message: 'Error fetching users', error: err });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).json({ message: 'Error fetching user', error: err });
        }
    },

    // Update user by ID
    updateUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User updated successfully', user });
        } catch (err) {
            res.status(500).json({ message: 'Error updating user', error: err });
        }
    },

    // Delete user by ID
    deleteUserById: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting user', error: err });
        }
    }
};