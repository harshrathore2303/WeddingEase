import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  getBudget,
  addBudget,
  deleteBudget,
} from "../controllers/budget.controller.js";

const router = Router();

router.get("/budget", verifyJWT, getBudget);
router.post("/budget/addBudget/:budgetId", verifyJWT, addBudget);
router.delete("/budget/:budgetId", verifyJWT, deleteBudget);

export default router;