const jwt = require('jsonwebtoken');
const { sendEvent } = require('../utils/kafka');

const authService = {};

authService.login = async (email, password) => {
    try {
        const user = {
            id: 1,
            email: "omkumar55800@gmail.com",
            password: "123456"
        };

        if (user.email === email && user.password === password) {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            await sendEvent('user-events', {
                type: 'USER_LOGGED_IN',
                data: {
                    userId: user.id,
                    email: user.email
                }
            });

            return {
                success: true,
                token
            };
        }

        return {
            success: false,
            message: "Invalid credentials"
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong"
        };
    }
};

module.exports = authService;