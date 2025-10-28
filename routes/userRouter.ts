import express from "express";
import { checkAuth } from "../middlewares/IscheckAuth.js";
import { GetCurrentUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/current-user", checkAuth, GetCurrentUser);

export default router;