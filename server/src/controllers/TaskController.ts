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
        const userId = req.user!.user_id;

        const newTask = await this.repository.create({ sectionId, userId });

        res.status(200).json(newTask);
    }

    public async update(req: Request, res: Response) {
        const { title, content, color } = req.body;
        const { taskId } = req.params;
        const userId = req.user!.user_id;

        const updatedTask = await this.repository.update({ userId, title, content, taskId, color });

        res.status(200).json(updatedTask);
    }

    public async deleteTask(req: Request, res: Response) {
        const { taskId, sectionId } = req.params;
        const userId = req.user!.user_id;

        await this.repository.deleteTask({ taskId, userId, sectionId });

        res.status(200).json({ message: 'Task succesfully deleted' });
    }

    public async updateTasksPositions(req: Request, res: Response) {
        const {
            sourceSectionId,
            destinationSectionId,
            sourceTasksList,
            destinationTasksList
        } = req.body;

        await this.repository.updateTasksPositions({
            destinationSectionId,
            destinationTasksList,
            sourceSectionId,
            sourceTasksList
        });


        res.status(200).json({ message: 'Updated' });
    }
}