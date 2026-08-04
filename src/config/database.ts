import "dotenv/config";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
    } catch (err) {
        console.error("MongoDB connection error:", JSON.stringify(err, null, 2));
        console.error("Error details:", err instanceof Error ? err.message : String(err));
        throw err;
    }
};

export default connectDB;