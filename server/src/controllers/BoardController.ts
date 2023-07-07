import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../helpers/apiErrors';

import { IBoardRepostiory } from "../repositories/types/IBoardRepository";

export class BoardController {
    constructor(
        private repository: IBoardRepostiory
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const userId = req.user!._id;
        const newBoard = await this.repository.create({ userId });
        return res.status(200).json(newBoard);
    }

    public async getAll(req: Request, res: Response) {
        const userId = req.user!._id;
        const boards = await this.repository.findAll({ userId });
        return res.status(200).json(boards);
    }


    public async updateBoardPosition(req: Request, res: Response) {
        const { boards } = req.body;
        await this.repository.updateBoardsPositions(boards);
        res.status(200).json({ message: 'updated' });
    }

    public async getOne(req: Request, res: Response) {
        const { boardId } = req.params;
        const userId = req.user!._id;

        if (!mongoose.isValidObjectId(boardId)) throw new BadRequestError('Invalid Id');

        const board = await this.repository.findOne({ userId, boardId });
        res.status(200).json(board);
    }

    public async deleteBoard(req: Request, res: Response) {
        const { boardId } = req.params;
        const userId = req.user!._id;

        await this.repository.deleteBoard({ boardId, userId });
        res.status(200).json({ message: 'Board sucessfully deleted' });
    }


}