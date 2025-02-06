const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    birthday: {
        type: Date,
        required: [true, 'Birthday is required']
    },
    idNumber: {
        type: String,
        required: [true, 'ID number is required'],
        unique: true,
        minlength: [10, 'ID number must be at least 10 characters long'],
        maxlength: [20, 'ID number must be less than 20 characters']
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
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);