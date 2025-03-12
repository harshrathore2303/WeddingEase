import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  addEvent,
  deleteEvent,
  getAllEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/event/addEvent", verifyJWT, addEvent);
router.get("/event", verifyJWT, getAllEvent);
router.delete("/event/:eventId", verifyJWT, deleteEvent);

export default router;
