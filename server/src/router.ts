import { Router } from "express";
import hardwareController from "./hardware/hardware-controller";
import departamentController from "./departament/departament-controller";
import userController from "./user/user-controller";
import multer from "multer";
import requestController from "./request/request-controller";
import analyticsController from "./analytics/analytics-controller";
import softwareController from "./software/software-controller";
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

//types
router.post("/type", hardwareController.createNewType);
router.get("/types/:category", hardwareController.getTypes);

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
router.put("/service-request/:id", requestController.deleteServiceRequest);
router.put("/modification-request/:id", requestController.deleteModificationRequest);

//analytics
router.post("/power-statistics", analyticsController.calculatePower);
router.post("/statistics", analyticsController.getStatistics);

//software
router.post("/software", softwareController.createNewSoftware);
router.get("/software", softwareController.fetchSoftware);
router.get("/software/:hardwareId", softwareController.getHardwareSoftware);
router.delete("/software/:id", softwareController.deleteById);

export default router;