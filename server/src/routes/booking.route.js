import { Router } from "express";
import { bookService, getUserBooking, getAdminBookings, updateBooking, getConflictedDates, countPendingBooking } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();

router.post("/booking", verifyJWT, authorizeRoles("user"), bookService);
router.get("/booking/user", verifyJWT, authorizeRoles("user"), getUserBooking);
router.get("/owned", verifyJWT, authorizeRoles("admin"), getAdminBookings);
router.patch("/booking/update/:id", verifyJWT, authorizeRoles("admin"), updateBooking);
router.get("/booking/conflicts/:id", verifyJWT, authorizeRoles("user"), getConflictedDates);
router.get("/booking/count", verifyJWT, authorizeRoles("admin"), countPendingBooking);


export default router;