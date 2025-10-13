import express from "express";
import { SignUp, SignIn, Logout } from "../controllers/auth.user.controllers.js";

const router = express.Router();

router.post("/SignUp", SignUp);
router.post("/SignIn", SignIn);
router.post("/logout", Logout);

export default router;
