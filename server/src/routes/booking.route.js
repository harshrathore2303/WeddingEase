import { Router } from "express";
import { bookService, getBookings } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();

router.post("/booking", verifyJWT, authorizeRoles("user"), bookService);
router.get("/booking", verifyJWT, authorizeRoles("user"), getBookings);

export default router;