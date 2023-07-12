import { Request, Response } from "express";

import { ISectionRepository } from "../repositories/types/ISectionRepository";

export class SectionController {
    constructor(
        private repository: ISectionRepository
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const { boardId } = req.params;
        const section: any = await this.repository.create({ boardId });
        section._doc.tasks = [];
        res.status(200).json(section);
    }

    public async update(req: Request, res: Response) {
        const { boardId, sectionId } = req.params;
        const { title } = req.body;
        const userId = req.user!._id;

        const section = await this.repository.update({ boardId, sectionId, userId, title });
        res.status(200).json(section);
    }

    public async deleteSection(req: Request, res: Response) {
        const { boardId, sectionId } = req.params;
        const userId = req.user!._id;

        await this.repository.deleteSection({ boardId, sectionId, userId });
        res.status(200).json({ message: 'Section sucessfully deleted' });
    }
}