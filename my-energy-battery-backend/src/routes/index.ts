import express from "express";
import {
  calculateBatteryConfiguration,
  getBatteries,
} from "../controllers/batteriesControllers";

const router = express.Router();

router.get("/batteries", getBatteries);
router.post("/calculate", calculateBatteryConfiguration);

export default router;
