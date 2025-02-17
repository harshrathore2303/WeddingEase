import { Router } from "express";
import { login, signup, logout, checkAuth, getUsers } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/user/logout", logout);
router.get("/user/checkAuth", verifyJWT ,checkAuth);
router.get("/user/getUsers", getUsers)

export default router;