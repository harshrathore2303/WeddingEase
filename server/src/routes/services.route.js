import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyOwnerJWT } from "../middlewares/verifyOwnerJWT.js";
import { createService, getById, getAllServices, getByFilter } from "../controllers/service.controller.js";

const router = Router();

router.post("/services", verifyOwnerJWT, upload.fields([
    {
      name: "dp",
      maxCount: 1,
    },
    {
      name: "imageSet",
      maxCount: 5,
    },
  ]), createService)

router.get("/services", getAllServices);
router.get("/services/:id", getById);
router.get("/services/filter", getByFilter);

export default router;