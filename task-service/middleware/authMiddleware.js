const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        // Check header
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const token = header.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data
        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;