import { Router } from "express";

import { BoardRepository } from "../repositories/board/BoardRepository";
import { BoardController } from "../controllers/BoardController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

const boardRepository = new BoardRepository();
const boardController = new BoardController(boardRepository);

router.post('/', authMiddleware, (req, res) => boardController.create(req, res));
router.get('/', authMiddleware, (req, res) => boardController.getAll(req, res));
router.put('/', authMiddleware, (req, res) => boardController.updateBoardsPositions(req, res));
router.get('/favoritesBoards', authMiddleware, (req, res) => boardController.getFavorites(req, res));

router.put('/:boardId', authMiddleware, (req, res) => boardController.update(req, res));
router.get('/:boardId', authMiddleware, (req, res) => boardController.getOne(req, res));
router.delete('/:boardId', authMiddleware, (req, res) => boardController.deleteBoard(req, res));




export default router;
