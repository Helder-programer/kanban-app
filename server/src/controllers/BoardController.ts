import { Request, Response } from 'express';
import { BadRequestError } from '../helpers/apiErrors';

import { IBoardRepostiory } from "../repositories/types/IBoardRepository";

export class BoardController {
    constructor(
        private repository: IBoardRepostiory
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const userId = req.user!.user_id;
        const newBoard = await this.repository.create({ userId });
        return res.status(200).json(newBoard);
    }

    public async getAll(req: Request, res: Response) {
        const userId = req.user!.user_id;
        const boards = await this.repository.findAll({ userId });
        return res.status(200).json(boards);
    }


    public async updateBoardsPositions(req: Request, res: Response) {
        const { boards } = req.body;
        await this.repository.updateBoardsPositions({ boards });
        res.status(200).json({ message: 'Updated!' });
    }

    public async getOne(req: Request, res: Response) {
        const { boardId } = req.params;
        const userId = req.user!.user_id;

        const board = await this.repository.findOne({ userId, boardId });
        res.status(200).json(board);
    }

    public async deleteBoard(req: Request, res: Response) {
        const { boardId } = req.params;
        const userId = req.user!.user_id;

        await this.repository.deleteBoard({ boardId, userId });
        res.status(200).json({ message: 'Board sucessfully deleted' });
    }

    public async update(req: Request, res: Response) {
        const { title, description, favorite, icon } = req.body;
        const { boardId } = req.params;
        const userId = req.user!.user_id;

        const updatedBoard = await this.repository.update({ title, description, favorite, icon, boardId, userId });

        res.status(200).json(updatedBoard);
    }

    public async getFavorites(req: Request, res: Response) {
        const userId = req.user!.user_id;
        const favoritesBoards = await this.repository.findFavorites({ userId });
        res.status(200).json(favoritesBoards);
    }

    public async updateFavoritesBoardsPositions(req: Request, res: Response) {
        const { boards } = req.body;
        await this.repository.updateBoardsPositions({ boards });
        res.status(200).json({ message: 'Updated!' });
    }


}