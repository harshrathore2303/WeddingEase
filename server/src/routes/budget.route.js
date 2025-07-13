import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  getBudget,
  addBudget,
  deleteBudget,
  updateBudget
} from "../controllers/budget.controller.js";

const router = Router();

router.get("/budget", verifyJWT, getBudget);
router.post("/budget", verifyJWT, addBudget);
router.delete("/budget/:budgetId", verifyJWT, deleteBudget);
router.patch("/budget/:id", verifyJWT, updateBudget);

export default router;