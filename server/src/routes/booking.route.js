import { Router } from "express";
import { bookService, getBookings } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.post("/booking", verifyJWT, bookService);
router.get("/booking", verifyJWT, getBookings);

export default router;