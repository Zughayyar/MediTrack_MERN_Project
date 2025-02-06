const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user roles
const roles = ['practitioner', 'assistant', 'administrator', 'patient'];

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [100, 'First name must be less than 100 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [100, 'Last name must be less than 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please fill a valid email address']
    },
    mobilePhone: {
        type: String,
        required: [true, 'Mobile phone is required'],
        minlength: [10, 'Mobile phone must be at least 10 characters long'],
        maxlength: [15, 'Mobile phone must be less than 15 characters'],
        match: [/^\d+$/, 'Please enter a valid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: roles // Ensures only allowed roles are assigned
    }
}, { timestamps: true });

// Password confirmation validation before saving (No need to store confirmPassword)
userSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

// Hash the password before saving a user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    // Remove confirmPassword from the document before saving
    this.confirmPassword = undefined;  // Ensure confirmPassword isn't stored
    next();
});

// Method to check if password matches the stored hash
userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);