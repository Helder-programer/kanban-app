import { v4 as uuidv4 } from 'uuid';

import { NotFoundError } from "../../helpers/apiErrors";
import Board from "../../models/Board";
import Section from "../../models/Section";
import Task from "../../models/Task";
import { ISectionRepository } from "../types/ISectionRepository";
import { ICreateSectionDTO } from "./dtos/ICreateSectionDTO";
import { IDeleteSectionDTO } from "./dtos/IDeleteSectionDTO";
import { IUpdateSectionDTO } from "./dtos/IUpdateSectionDTO";

export class SectionRepository implements ISectionRepository {
    public async create(data: ICreateSectionDTO) {
        const sectionId = uuidv4();

        const boardToValidate = await Board.findOne({
            where: {
                user_id: data.userId,
                board_id: data.boardId
            },
            include: [{
                model: Section,
                as: 'sections',
                required: false
            }]

        });

        if (!boardToValidate) throw new NotFoundError('Board not found!');

        await Section.create({
            section_id: sectionId,
            board_id: data.boardId,
            title: data.title,
            position: boardToValidate.sections.length
        });

        const newSection = await Section.findByPk(sectionId, {
            include: {
                model: Task,
                required: false,
            }
        });

        return newSection!;
    }

    public async update({ sectionId, userId, title }: IUpdateSectionDTO) {
        const sectionToUpdate = await Section.findOne({
            where: {
                section_id: sectionId,
            },
            include: {
                model: Board,
                attributes: [],
                required: true,
                where: {
                    user_id: userId
                }
            }
        });

        if (!sectionToUpdate) throw new NotFoundError('Section not found!');

        sectionToUpdate.set({ title: title });
        await sectionToUpdate.save();

        return sectionToUpdate;
    }

    public async deleteSection({ sectionId, userId }: IDeleteSectionDTO) {
        const sectionToDelete = await Section.findOne({
            where: {
                section_id: sectionId,
            },
            include: {
                model: Board,
                attributes: [],
                required: true,
                where: {
                    user_id: userId
                }
            }
        });

        if (!sectionToDelete) throw new NotFoundError('Section not found!');

        sectionToDelete.destroy();
    }

}