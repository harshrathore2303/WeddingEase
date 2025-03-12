import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import {
  addCategory,
  addTask,
  getAllChecks,
  deleteCategory,
  deleteTask,
} from "../controllers/checklist.controller.js";

const router = Router();

router.post("/checkList/addCategory", verifyJWT, addCategory);
router.post("/checkList/:categoryId/addTask", verifyJWT, addTask);
router.get("/checkList", verifyJWT, getAllChecks);
router.delete("/checkList/:categoryId", verifyJWT, deleteCategory);
router.delete("/checkList/:categoryId/:taskId", deleteTask);

export default router;
