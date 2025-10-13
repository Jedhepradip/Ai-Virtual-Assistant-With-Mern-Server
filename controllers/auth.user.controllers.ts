import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { generateToken } from "../utils/generateToken.js";

export const SignUp = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password } = req.body;

        console.log("req.body : ", req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields (name, email, password) are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser?._id as string);

        console.log("token :", token);

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({ success: true, message: "User registered successfully" });

    } catch (error: any) {
        console.error("❌ SignUp Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const SignIn = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found. Please register first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id as string);

        console.log(token);

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        return res.status(200).json({ success: true, message: "Login successful" });

    } catch (error: any) {
        console.error("❌ Login Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const Logout = (req: Request, res: Response): Response => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });

    } catch (error: any) {
        console.error("❌ Logout Error:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
