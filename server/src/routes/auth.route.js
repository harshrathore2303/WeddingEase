import { Router } from "express";
import {
  login,
  signup,
  logout,
  checkAuth,
  getUsers,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/checkAuth", verifyJWT, checkAuth);
router.get("/getUsers", verifyJWT, getUsers);
router.put("/update", verifyJWT, updateProfile)


export default router;
