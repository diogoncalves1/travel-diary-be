import { Router } from "express";
import { HealthController } from "./controllers/health.controller";

const router = Router();

const healthController = HealthController.build();

router.get("/health", healthController.test.bind(healthController));

export { router };
