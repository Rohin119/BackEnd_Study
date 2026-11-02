
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d"
        }
    );
};

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            });
        }

        // Check if user already exists
        const existing = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existing) {
            return res.status(400).json({
                message: "User already exists!"
            });
        }

        // Create user
        const user = await User.create({
            username,
            email: email.toLowerCase().trim(),
            password
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or username already exists!"
            });
        }

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Send response
        res.status(200).json({
            message: "User logged in successfully",

            token,

            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

// LOGOUT USER
const logoutuser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful",
            instruction: "Remove the JWT token from the client"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutuser
};
