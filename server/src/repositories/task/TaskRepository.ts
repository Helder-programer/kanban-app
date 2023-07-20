import Section from "../../models/Section";
import Task from "../../models/Task";
import { NotFoundError } from "../../helpers/apiErrors";
import { ITaskRepository } from "../types/ITaskRepository";
import { ICreateTaskDTO } from "./dtos/ICreateTaskDTO";
import { ITaskDocument } from "../../models/types/ITaskDocument";
import { IUpdateBoardDTO } from "../board/dtos/IUpdateBoardDTO";
import { IUpdateTaskDTO } from "./dtos/IUpdateTaskDTO";
import { IDeleteTaskDTO } from "./dtos/IDeleteTaskDTO";

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
        return newTask;
    }


    public async update(data: IUpdateTaskDTO) {
        const taskToUpdate = await Task.findById(data.taskId);
        if (!taskToUpdate) throw new NotFoundError('Task not found!');

        let objectToUpdate: any = {};

        if (data.title) objectToUpdate.title = data.title;
        if (data.content) objectToUpdate.content = data.content;

        taskToUpdate.set(objectToUpdate);
        await taskToUpdate.save();
        return taskToUpdate;
    }

    public async deleteTask(data: IDeleteTaskDTO) {
        await Task.deleteOne({ _id: data.taskId });
    }
}