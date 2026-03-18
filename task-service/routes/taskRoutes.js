const express = require('express');
const taskController = require('../controller/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/communicate', authMiddleware, taskController.serviceCommunicate);
router.get('/getalltasks', taskController.getTasks)

module.exports = router;