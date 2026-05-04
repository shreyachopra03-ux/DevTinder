import "dotenv/config";
import express from 'express';
import connectDB from './config/database.js';
const app = express();
const PORT: number = Number(process.env.PORT) || 7777;
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

function startServer(port: number) {
    const server = app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

    server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
            const nextPort = port + 1;
            console.log(`Port ${port} is already in use..., so trying ${port + 1}...`);
            startServer(nextPort); 
        } else {
            console.error("Server error:", err);
        }
    });
}

connectDB()
    .then(() => {
        console.log("Database connected successfully...");
        startServer(PORT);
    })
    .catch((err) => {
        console.error("Database connection failed!");
        process.exit(1); 
    });

