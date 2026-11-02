
import dns from "node:dns";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/database.js";
import app from "./app.js";

// Configure DNS before MongoDB connection
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 8000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();
