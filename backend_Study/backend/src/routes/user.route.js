
import express from "express";

import {
    registerUser,
    loginUser,
    logoutuser
} from "../controllers/user.controller.js";

import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutuser);

// Protected route
router.get("/me", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Authenticated user details",
        user: req.user
    });
});

export default router;
