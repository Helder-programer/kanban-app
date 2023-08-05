import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { TaskRepository } from "../repositories/task/TaskRepository";
import { authMiddleware } from "../middlewares/auth";

const router = Router({ mergeParams: true });

const taskRepository = new TaskRepository();
const taskController = new TaskController(taskRepository);


router.post('/:sectionId/tasks', authMiddleware, (req, res) => taskController.create(req, res));
router.put('/tasks/updatePositions', authMiddleware, (req, res) => taskController.updateTasksPositions(req, res));
router.put('/:sectionId/tasks/:taskId', authMiddleware, (req, res) => taskController.update(req, res));
router.delete('/:sectionId/tasks/:taskId', authMiddleware, (req, res) => taskController.deleteTask(req, res));


export default router;