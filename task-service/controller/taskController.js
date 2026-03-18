const taskService = require('../services/taskService');

const taskController = {};

taskController.getAllTasks = (req, res) => {
    try {
        const user = req.user; // coming from authMiddleware

        const result = taskService.getAllTasks(user);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

taskController.serviceCommunicate = (req, res) => {
    try {
        
        const token = req.headers.authorization.split(' ')[1];

        console.log(token);

        const result = taskService.serviceCommunicate(token);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = taskController;