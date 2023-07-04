import { Router } from "express";

import { BoardRepository } from "../repositories/board/BoardRepository";
import { BoardController } from "../controllers/BoardController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const boardRepository = new BoardRepository();
const boardController = new BoardController(boardRepository);

router.post('/', authMiddleware, (req, res) => boardController.create(req, res));
router.get('/', authMiddleware, (req, res) => boardController.getAll(req, res));




export default router;
