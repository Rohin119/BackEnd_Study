
import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

// CREATE POST
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        // Basic validation
        if (!name || !description || age === undefined || age === null) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const post = await Post.create({
            name,
            description,
            age
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        console.log("CREATE POST ERROR:", error);

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// READ ALL POSTS
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {
        console.log("GET POSTS ERROR:", error);

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// UPDATE POST
const updatePost = async (req, res) => {
    try {
        // Get ID and remove accidental quotation marks
        const id = req.params.id
            .trim()
            .replace(/^["']+|["']+$/g, "");

        console.log("UPDATE ID:", JSON.stringify(id));

        // Validate MongoDB ObjectId
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
           return res.status(400).json({
                 message: "Invalid Post ID"
          });
}
        // Check if body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            post
        });

    } catch (error) {
        console.log("UPDATE POST ERROR:", error);

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// DELETE POST
const deletePost = async (req, res) => {
    try {
        // Get ID and remove accidental quotation marks
        const id = req.params.id
            .trim()
            .replace(/^["']+|["']+$/g, "");

        console.log("DELETE ID:", JSON.stringify(id));

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Post ID"
            });
        }

        const deleted = await Post.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post successfully deleted"
        });

    } catch (error) {
        console.log("DELETE POST ERROR:", error);

        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// EXPORT ALL FUNCTIONS
export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
