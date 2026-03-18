const authService = require('../services/authService');

const authController = {};

authController.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "email is required" });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: "password is required" });
        }

        if (!name) {
            return res.status(400).json({ success: false, message: "name is required" });
        }

        const result = await authService.register({ name, email, password });

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "email is required" });
        }

        if (!password) {
            return res.status(400).json({ success: false, message: "password is required" });
        }

        const result = await authService.login({ email, password });

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = authController;