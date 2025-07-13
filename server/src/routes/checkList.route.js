import express from "express";
import {
  getChecklists,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} from "../controllers/checklist.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.get("/lists", verifyJWT, getChecklists);
router.post("/list", verifyJWT, createChecklist);
router.put("/list/:id", verifyJWT, updateChecklist);
router.delete("/list/:id", verifyJWT, deleteChecklist);

export default router;
