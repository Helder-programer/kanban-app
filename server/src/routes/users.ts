import { Router } from "express";

import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";
import { UserRepository } from "../repositories/user/UserRepository";

const router = Router();

const userRepository = new UserRepository()
const userController = new UserController(userRepository);

router.post('/', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/recoverUserInformations', authMiddleware, (req, res) => userController.recoverUserInformations(req, res));
router.put('/', authMiddleware, (req, res) => userController.update(req, res));

export default router;

