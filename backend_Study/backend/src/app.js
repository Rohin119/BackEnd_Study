import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();  // create an express app

app.use(express.json());

// routes import
import userRouter from './routes/user.route.js'; 
import postRouter from './routes/post.route.js';


// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRoutes);

// example route: http://localhost:4000/api/v1/users/register

export default app;