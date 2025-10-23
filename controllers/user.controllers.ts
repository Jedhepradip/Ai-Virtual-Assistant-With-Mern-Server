import type { Request, Response } from "express";
import User from "../models/User.model.js";

export const GetCurrentUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = req?.userId

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - No user ID found" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error: any) {
        console.error("GetCurrentUser Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};