import { Router } from "express";
import {
  getAllNotifications,
  markAllNotifications,
  markNotificationRead,
  deleteNotification,
  deleteAllNotifications,
  getNotificationSummary,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();

router.get("/notifications", verifyJWT, authorizeRoles("admin"), getAllNotifications);
router.patch("/notifications/:id/read", verifyJWT, authorizeRoles("admin"), markNotificationRead);
router.patch("/notifications/mark-all-read", verifyJWT, authorizeRoles("admin"), markAllNotifications);
router.delete("/notifications/:id", verifyJWT, authorizeRoles("admin"), deleteNotification);
router.delete("/notifications", verifyJWT, authorizeRoles("admin"), deleteAllNotifications);
router.get("/notifications/summary", verifyJWT, authorizeRoles("admin"), getNotificationSummary);

export default router;
