//middelware untuk autentikasi
const jwt = require('jsonwebtoken');

// Authentication middleware
exports.authenticateToken = (req, res, next) => {
    try {
        console.log(req.headers.authorization.split(' ')[1])
        const token = req.headers.authorization.split(' ')[1]; // Extract token from the Authorization header
        const decoded = jwt.verify(token, 'septian'); // Verify the token using the secret key

        // Attach the decoded token to the request object
        req.user = decoded.user;

        next(); // Move to the next middleware
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};