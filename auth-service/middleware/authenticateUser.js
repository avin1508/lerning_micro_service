const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if(!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const token = header.split(' ')[1];

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error); 
    }
}

module.exports = authCheck;