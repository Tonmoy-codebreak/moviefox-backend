import { Router, type IRouter } from "express";
import { login, registerUser } from "./auth.controller.js";

const router: IRouter = Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;
