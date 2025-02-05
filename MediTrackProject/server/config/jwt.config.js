const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    // Ensure req.cookies is defined
    if (!req.cookies) {
        return res.status(401).json({ verified: false, message: "No cookies found, unauthorized access." });
    }

    // Check if the user token exists in the cookies
    const token = req.cookies.usertoken;

    if (!token) {
        return res.status(401).json({ verified: false, message: "No token provided, unauthorized access." });
    }

    // Verify the token with the secret key
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ verified: false, message: "Invalid or expired token." });
        }

        // If verification is successful, attach the payload to the request object
        req.user = payload;
        next();  // Proceed to the next middleware/route handler
    });
};