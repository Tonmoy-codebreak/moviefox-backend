import { Router, type IRouter } from "express";
import { getUserProfile, login, registerUser } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router: IRouter = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);

export default router;
