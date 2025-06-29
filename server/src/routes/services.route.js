import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { createService, getById, getAllServices, getByFilter, getServicesByAdmin, deleteService, updateService } from "../controllers/service.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { authorizeRoles } from "../middlewares/authorizeRole.js";

const router = Router();

router.post("/services", verifyJWT, authorizeRoles("admin"),  upload.fields([
    {
      name: "dp",
      maxCount: 1,
    },
    {
      name: "imageSet",
      maxCount: 5,
    },
  ]), createService);

router.get("/services", getAllServices);
router.get("/services/:id", getById);
router.get("/services/filter", getByFilter);
router.get("/adminServices", verifyJWT, authorizeRoles("admin"), getServicesByAdmin);
router.delete("/delete/:id", deleteService);
router.put("/services/:id", updateService);

export default router;