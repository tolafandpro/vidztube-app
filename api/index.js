import express from "express";
import mongoose from "mongoose"; 
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auths.js";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
dotenv.config();
const app = express();


//DB Connections function
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
}

//Middleware Functions
app.use(cors());
app.use(cookieParser());
app.use(express.json());


//Routes Functions
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Error something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
        stack: err.stack
    });
});


const port = process.env.Port || 8800;
app.listen(port, () => { 
    connect()
    console.log(`Connected to backend working and app is listening to port ${port}`)
});
