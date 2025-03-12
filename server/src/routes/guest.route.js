import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  addGuest,
  getAllGuest,
  addGuestDetail,
  addEventToGuest,
  deleteList,
  deleteGuest,
  deleteEventFromGuest,
} from "../controllers/guest.controller.js";

const router = Router();

router.post("/guest", verifyJWT, addGuest);
router.get("/guest/getAllGuests", verifyJWT, getAllGuest);
router.post("/guest/addGuestDetails/:title", verifyJWT, addGuestDetail);
router.post(
  "/guest/addGuestDetails/:title/:guestId",
  verifyJWT,
  addEventToGuest
);
router.post(
  "/guest/deleteEventFromGuest/:title/:guestId",
  verifyJWT,
  deleteEventFromGuest
);
router.delete("/guest/deleteTitle/:titleId", verifyJWT, deleteList);
router.delete("/guest/deleteGuest/:titleId/:guestId", verifyJWT, deleteGuest);

export default router;
