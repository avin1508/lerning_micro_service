const authService = require('../services/authService');

const authController = {};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await authService.login(email, password);

        if (!result.success) {
            return res.status(401).json(result);
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

authController.getMe = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = authController;