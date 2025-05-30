import { Router } from "express";
import { signup, login, logout, checkAuth, getOwners } from "../controllers/owner.controller.js";

const router = Router();

router.post('/owner/signup', signup);
router.post('/owner/login', login);
router.post('/owner/logout', logout);
router.get('/owner/checkAuth', checkAuth);
router.get('/owner/getOwners', getOwners);

export default router;