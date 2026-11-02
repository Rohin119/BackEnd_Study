
import express from "express";

import {
    createPost,
    getPosts,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

// GET ALL POSTS (Public Route)
router.get("/get", getPosts);

// CREATE POST (Protected Route)
router.post("/create", verifyToken, createPost);

// UPDATE POST (Protected Route)
router.patch("/update/:id", verifyToken, updatePost);

// DELETE POST (Protected Route)
router.delete("/delete/:id", verifyToken, deletePost);

export default router;
