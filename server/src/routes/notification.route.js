import { Router } from "express";
import { getAllNotifications, markAllNotifications, markNotificationRead, deleteNotification, deleteAllNotifications, getNotificationSummary } from "../controllers/notification.controller.js";
import { verifyOwnerJWT } from "../middlewares/verifyOwnerJWT.js";

const router = Router();

router.get("/notifications", verifyOwnerJWT, getAllNotifications);
router.patch("/notifications/:id/read", verifyOwnerJWT, markNotificationRead);
router.patch("/notifications/mark-all-read", verifyOwnerJWT, markAllNotifications);
router.delete("/notifications/:id", verifyOwnerJWT, deleteNotification);
router.delete("/notifications", verifyOwnerJWT, deleteAllNotifications);
router.get("/notifications/summary", verifyOwnerJWT, getNotificationSummary);

export default router;