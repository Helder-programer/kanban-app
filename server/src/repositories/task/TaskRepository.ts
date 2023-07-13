import { NotFoundError } from "../../helpers/apiErrors";
import Section from "../../models/Section";
import Task from "../../models/Task";
import { ITaskDocument } from "../../models/types/ITaskDocument";
import { ITaskRepository } from "../types/ITaskRepository";
import { ICreateTaskDTO } from "./dtos/ICreateTaskDTO";

export class TaskRepository implements ITaskRepository {
    public async create(data: ICreateTaskDTO) {
        const section = await Section.findById(data.sectionId);
        const tasks = await Task.find({ section: section?.id });


        if (!section) throw new NotFoundError('Section not found');

        const newTask: any = new Task({
            section: section?.id,
            position: tasks.length > 0 ? tasks.length : 0
        });

        await newTask.save();
        newTask._doc.section = section;
        console.log(newTask);

        return newTask;
    }
}