import { Request, Response } from "express";
import { ITaskRepository } from "../repositories/types/ITaskRepository";

export class TaskController {

    constructor(
        private repository: ITaskRepository
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const { sectionId } = req.body;

        const newTask = await this.repository.create({ sectionId });

        res.status(200).json(newTask);
    }

    public async update(req: Request, res: Response) {
        const { title, content } = req.body;
        const { taskId } = req.params;
        const updatedTask = this.repository.update({ title, content, taskId });

        res.status(200).json(updatedTask);
    }

    public async deleteTask(req: Request, res: Response) {
        const { boardId, taskId } = req.params;

        await this.repository.deleteTask({ taskId, boardId });

        res.status(200).json({ message: 'Task succesfully deleted' });
    }
}