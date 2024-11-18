import { Router } from "express";
import hardwareController from "./hardware/hardware-controller";
import departamentController from "./departament/departament-controller";
import userController from "./user/user-controller";
import multer from "multer";
import requestController from "./request/request-controller";
const router = Router();

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/files");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });

const upload = multer({
    storage: storageEngine
});

//hardware
router.get("/hardware/:id", hardwareController.getHardwareById);
router.post("/filter-hardware", hardwareController.filterHardware);
router.post("/hardware", hardwareController.createHardware);
router.put("/hardware/:id", hardwareController.updateHardware);
router.patch("/modernize/:id", hardwareController.modernize);
router.post("/sell/:id", hardwareController.sell)
router.delete("/hardware/:id", hardwareController.deleteById);
router.get("/selled-hardware", hardwareController.getSelledHardware);

//instructions
router.post("/instruction/:hardwareId", upload.single("instruction"), hardwareController.uploadInstruciton);
router.get("/instruction/:hardwareId", hardwareController.downloadInstruction);

//departament
router.get("/departaments", departamentController.fetchDepartaments);
router.post("/departament", departamentController.createDepartament);
router.patch("/departament/users/:departamentId", departamentController.pushUser);

//requests post
router.post("/hardware-request", requestController.createHardwareRequest);
router.post("/modification-request", requestController.createModificationRequest);
router.post("/service-request", requestController.createServiceRequest);

//requests edit
router.get("/hardware-requests", requestController.getHardwareRequests);
router.delete("/hardware-request/:id", requestController.deleteHardwareRequest);
router.get("/hardware-request/:id", requestController.getHardwareRequestById);
router.patch("/submit-hardware/:id", requestController.setSubmitedStatus);
router.get("/ser-requests",requestController.getAdminSerRequests);
router.get("/mod-requests", requestController.getAdminModRequests);
router.delete("/service-request/:id", requestController.deleteServiceRequest);
router.delete("/modification-request/:id", requestController.deleteModificationRequest);

export default router;