import Section from "../../models/Section";
import Task from "../../models/Task";
import { NotFoundError } from "../../helpers/apiErrors";
import { ITaskRepository } from "../types/ITaskRepository";
import { ICreateTaskDTO } from "./dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "./dtos/IUpdateTaskDTO";
import { IDeleteTaskDTO } from "./dtos/IDeleteTaskDTO";
import { IUpdateTasksPositionsDTO } from "./dtos/IUpdateTasksPositionsDTO";

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
        if (data.color) objectToUpdate.color = data.color;

        taskToUpdate.set(objectToUpdate);
        await taskToUpdate.save();
        return taskToUpdate;
    }

    public async deleteTask(data: IDeleteTaskDTO) {
        const taskToDelete = await Task.findById(data.taskId);
        await Task.deleteOne({ _id: taskToDelete?.id });

        const tasks = await Task.find({ section: taskToDelete?.section });

        for (let key in tasks) {
            await Task.findByIdAndUpdate(tasks[key].id, { position: key });
        }
    }


    public async updateTasksPositions({ destinationSectionId, destinationTasksList, sourceSectionId, sourceTasksList }: IUpdateTasksPositionsDTO) {
        if (sourceSectionId != destinationSectionId) {
            for (let key in sourceTasksList) {
                await Task.findByIdAndUpdate(sourceTasksList[key]._id, {
                    section: sourceSectionId,
                    position: key
                });
            }
        }

        for (let key in destinationTasksList) {
            await Task.findByIdAndUpdate(destinationTasksList[key]._id, {
                section: destinationSectionId,
                position: key
            });
        }
    }
}