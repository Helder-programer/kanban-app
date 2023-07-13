import { Request, Response } from "express";
import { ITaskRepository } from "../repositories/types/ITaskRepository";

export class TaskController {

    constructor(
        private repository: ITaskRepository
    ) {
        this.repository = repository;
    }

    async create(req: Request, res: Response) {
        const { sectionId } = req.body;

        const newTask = this.repository.create({ sectionId });

        res.status(200).json(newTask);





    }

}