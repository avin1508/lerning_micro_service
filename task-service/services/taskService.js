const axios = require('axios');
const taskService = {};

taskService.getAllTasks = (user) => {
    return {
        user,
        tasks: [
            { id: 1, title: "Learn Microservices" },
            { id: 2, title: "Build Project" }
        ]
    };
};

taskService.serviceCommunicate = async (token) => {
    try {
        const user = await axios.get('http://localhost:3000/api/auth/me',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return {
            sueccess: true,
            user,
            task: [
                { id: 1, title: "Learn Microservices" },
                { id: 2, title: "Build Project" }
            ]
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Internal server error"
        }
    }
};

module.exports = taskService;