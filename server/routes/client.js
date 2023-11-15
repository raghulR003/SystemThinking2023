import express from "express";
import {
  getServices,
  getWorkers,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/services", getServices);
router.get("/workers", getWorkers);
router.get("/geography", getGeography);

export default router;
