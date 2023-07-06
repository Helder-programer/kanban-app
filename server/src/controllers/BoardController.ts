import { Request, Response } from 'express';

import { IBoardRepostiory } from "../repositories/types/IBoardRepository";

export class BoardController {
    constructor(
        private repository: IBoardRepostiory
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const userId = req.user?._id;
        const newBoard = await this.repository.create(userId!);
        return res.status(200).json(newBoard);
    }

    public async getAll(req: Request, res: Response) {
        const userId = req.user?._id;
        const boards = await this.repository.findAll(userId!);
        return res.status(200).json(boards);
    }


    public async updateBoardPosition(req: Request, res: Response) {
        const { boards } = req.body;
        this.repository.updateBoardsPositions(boards);
        res.status(200).json({ message: 'updated' });
    }

    public async getOne(req: Request, res: Response) {
        
    }


}