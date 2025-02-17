import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { addGuest, getAllGuest, addGuestDetail, addEventToGuest, deleteList, deleteGuest } from "../controllers/guest.controller.js";

const router = Router();

router.post("/guest", verifyJWT, addGuest);
router.get("/guest/getAllGuests", verifyJWT, getAllGuest);
router.post("/guest/addGuestDetails/:title", verifyJWT, addGuestDetail);
router.post("/guest/addGuestDetails/:title", verifyJWT, addEventToGuest);
router.delete("/guest/:id", verifyJWT, deleteList);
router.delete("/guest/:title", verifyJWT, deleteGuest);

export default router;