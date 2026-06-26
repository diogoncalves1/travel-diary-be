import { Router } from "express";
import { HealthController } from "./controllers/health.controller";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router();

const healthController = HealthController.build();

router.use("/auth", authRoutes);
router.get("/health", healthController.test.bind(healthController));

export { router };
