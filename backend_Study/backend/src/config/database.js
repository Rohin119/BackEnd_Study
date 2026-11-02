
import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error("MONGODB_URI is missing from .env file");
    }

    if (
        !mongoURI.startsWith("mongodb://") &&
        !mongoURI.startsWith("mongodb+srv://")
    ) {
        throw new Error("Invalid MongoDB connection string");
    }

    try {
        console.log("Connecting to MongoDB Atlas...");

        const connectionInstance = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 15000
        });

        console.log(
            "MongoDB connected successfully:",
            connectionInstance.connection.host
        );

        return connectionInstance;

    } catch (error) {
        console.error("\nMongoDB connection failed!");
        console.error("Error:", error.message);

        // Display individual server errors
        const servers = error.reason?.servers;

        if (servers) {
            for (const [address, server] of servers) {
                console.error("\nServer:", address);
                console.error(
                    "Server error:",
                    server.error?.message || "No detailed error available"
                );
            }
        }

        throw error;
    }
};

export default connectDB;
