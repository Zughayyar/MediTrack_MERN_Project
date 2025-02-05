// Validate Email
const isValidEmail = val => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val);
const emailValidation = {
    validator: isValidEmail,
    message: 'Please enter a valid email address'
};

// Validate Phone Number (Only Digits, 10-15 characters)
const isValidPhone = val => /^\d{10,15}$/.test(val);
const phoneValidation = {
    validator: isValidPhone,
    message: 'Please enter a valid phone number (10-15 digits only)'
};

// Validate Name (Min: 2, Max: 100)
const isValidName = val => val.length >= 2 && val.length <= 100;
const nameValidation = {
    validator: isValidName,
    message: 'Name must be between 2 and 100 characters'
};

// Validate Password Length (At least 8 characters)
const isValidPassword = val => val.length >= 8;
const passwordValidation = {
    validator: isValidPassword,
    message: 'Password must be at least 8 characters long'
};

// Export Validators
module.exports = {
    emailValidation,
    phoneValidation,
    nameValidation,
    passwordValidation
};