const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEvent } = require('../utils/kafka');

const authService = {};

authService.register = async (data) => {
    try {
        const { name, email, password } = data;

        // Check if user exists
        const user = await User.findOne({ email }).select('_id email');
        if (user) {
            return {
                success: false,  
                message: "User already exists"
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const { _id } = newUser;

        await sendEvent('user-events', { type: 'USER_CREATED', data: { _id, name, email } });
        return {
            success: true,
            message: "User created successfully",
            data: { _id, name, email }  
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,  // fixed typo
            message: "Internal server error"
        };
    }
};


authService.login = async (data) => {
    try {
        const { email, password } = data;

        // Check if user exists
        const user = await User.findOne({ email }).select('_id email password');
        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                success: false,
                message: "Invalid credentials"
            };
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            success: true,
            message: "Login successful",
            data: { token }
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Internal server error"
        };
    }
};



module.exports = authService;