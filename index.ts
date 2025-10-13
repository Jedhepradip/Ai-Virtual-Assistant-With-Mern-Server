import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRouter.js'

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth-api", authRouter)
app.use("/api-user", userRouter)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    connectDB()
    console.log(`✅ Server running at http://localhost:${PORT}`);
});