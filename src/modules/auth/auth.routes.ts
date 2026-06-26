import { Router } from "express";
import { AuthController } from "./auth.controller";
import { UserRepositoryPrisma } from "../user/prisma/user.repository.prisma";
import { prisma } from "../../infrastructure/prisma/prisma.client";
import { AuthServiceImplementation } from "./auth.service.impl";

const router = Router();

const userRepository = UserRepositoryPrisma.build(prisma);

const authService = AuthServiceImplementation.build(userRepository);

const authController = AuthController.build(authService);

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));

export const authRoutes = router;
