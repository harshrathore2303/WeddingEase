import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  addGuest,
  addGroup,
  getData,
  deleteGroup,
  deleteGuest
} from "../controllers/guest.controller.js";

const router = Router();

router.post("/group", verifyJWT, addGroup);
router.get("/group", verifyJWT, getData);
router.post("/group/addGuest", verifyJWT, addGuest);
router.delete("/group/:groupId", verifyJWT, deleteGroup);
router.delete("/group/:groupId/guest/:guestId", verifyJWT, deleteGuest);

export default router;