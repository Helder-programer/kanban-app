import { v4 as uuidv4 } from 'uuid';

import Section from "../../models/Section";
import Task from "../../models/Task";
import Board from '../../models/Board';
import { NotFoundError } from "../../helpers/apiErrors";
import { ITaskRepository } from "../types/ITaskRepository";
import { ICreateTaskDTO } from "./dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "./dtos/IUpdateTaskDTO";
import { IDeleteTaskDTO } from "./dtos/IDeleteTaskDTO";
import { IUpdateTasksPositionsDTO } from "./dtos/IUpdateTasksPositionsDTO";

export class TaskRepository implements ITaskRepository {
    public async create(data: ICreateTaskDTO) {
        const sectionToValidate = await Section.findOne({
            where: {
                section_id: data.sectionId,
            },
            include: {
                model: Board,
                attributes: [],
                where: {
                    user_id: data.userId
                }
            }
        });

        if (!sectionToValidate) throw new NotFoundError('Section not found');


        const tasksQuantity = await this.countTasks(data.sectionId);
        const taskId = uuidv4();

        const newTask = await Task.create({
            task_id: taskId,
            section_id: data.sectionId,
            position: tasksQuantity > 0 ? tasksQuantity : 0
        });

        return newTask;
    }


    public async update(data: IUpdateTaskDTO) {
        const taskToUpdate = await Task.findOne({
            where: {
                task_id: data.taskId
            },
            include: {
                model: Section,
                required: true,
                attributes: [],
                include: [
                    {
                        model: Board,
                        where: {
                            user_id: data.userId
                        },
                    }
                ],
            }
        });
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
        const taskToDelete = await Task.findOne({
            where: {
                task_id: data.taskId
            },
            include: {
                model: Section,
                required: true,
                attributes: [],
                include: [
                    {
                        model: Board,
                        where: {
                            user_id: data.userId
                        },
                    }
                ],
            }
        });
        if (!taskToDelete) throw new NotFoundError('Task not found!');
        await taskToDelete.destroy();

        const tasks = await Task.findAll({
            where: {
                section_id: data.sectionId
            }
        });

        for (let key in tasks) {
            await Task.update({ position: Number(key) }, { where: { task_id: tasks[key].task_id } });
        }
    }

    private async countTasks(sectionId: string) {
        const tasks = await Task.findAll({ where: { section_id: sectionId } });
        return tasks.length;
    }

    public async updateTasksPositions({ destinationSectionId, destinationTasksList, sourceSectionId, sourceTasksList }: IUpdateTasksPositionsDTO) {
        if (sourceSectionId != destinationSectionId) {
            for (let key in sourceTasksList) {
                await Task.update(
                    {
                        section_id: sourceSectionId,
                        position: Number(key)
                    },
                    {
                        where: {
                            task_id: sourceTasksList[key].task_id
                        }
                    }
                );
            }
        }

        for (let key in destinationTasksList) {
            await Task.update(
                {
                    position: Number(key)
                },
                {
                    where: {
                        task_id: sourceTasksList[key].task_id
                    }
                }
            );
        }
    }
}