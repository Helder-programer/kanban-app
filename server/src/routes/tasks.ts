import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repositories/task/TaskRepository";
import { authMiddleware } from "../middlewares/auth";

const router = Router({ mergeParams: true });

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);


router.post('/', authMiddleware, (req, res) => taskController.create(req, res));


export default router;