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
        const newSection = new Section({ board: data.boardId });
        await newSection.save();
        return newSection;
    }

    public async update(data: IUpdateSectionDTO) {
        const boardToValidate = await Board.findOne({ user: data.userId });
        const sectionToUpdate: any = await Section.findOne({ board: boardToValidate?._id });

        if (!sectionToUpdate) throw new NotFoundError('Section not found!');

        sectionToUpdate.set({ title: data.title });
        await sectionToUpdate.save();
        
        sectionToUpdate._doc.tasks = [];
        return sectionToUpdate;
    }

    public async deleteSection(data: IDeleteSectionDTO) {
        const boardToValidate = await Board.findOne({ user: data.userId });
        const sectionToDelete = await Section.findOne({ _id: data.sectionId, board: boardToValidate?._id });

        if (!sectionToDelete) throw new NotFoundError('Section not found!');

        await Task.deleteMany({ section: sectionToDelete._id });
        await Section.findByIdAndDelete(sectionToDelete._id);
    }

}