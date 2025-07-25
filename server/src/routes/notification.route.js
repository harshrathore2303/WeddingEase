import { Router } from "express";
import {
  getAllNotifications,
  markNotificationRead,
  deleteNotification,
  countNotification
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();

router.get("/notifications", verifyJWT, authorizeRoles("user"), getAllNotifications);
router.patch("/notification/:id", verifyJWT, authorizeRoles("user"), markNotificationRead);
router.delete("/notification/:id", verifyJWT, authorizeRoles("user"), deleteNotification);
router.get("/notification/count", verifyJWT, authorizeRoles("user"), countNotification);

export default router;
