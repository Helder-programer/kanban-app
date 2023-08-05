import { ITask } from "@/types/ITask";
import { api } from "./api";

interface ICreateTaskParams {
    sectionId: string;
    boardId: string;
}

interface IUpdateTaskParams {
    boardId?: string;
    sectionId: string;
    taskId?: string;
    title?: string;
    content?: string;
    color?: string;
}

interface IDeleteTaskParams {
    boardId: string;
    taskId: string;
}

interface IUpdateTasksPositionsParams {
    boardId: string;
    sourceSectionId: string;
    destinationSectionId: string;
    sourceTasksList: ITask[];
    destinationTasksList: ITask[];
}

export const taskService = {
    create: async function (data: ICreateTaskParams) {
        const response = await api.post<ITask>(`/boards/${data.boardId}/sections/${data.sectionId}/tasks`);
        return response.data;
    },

    update: async function (data: IUpdateTaskParams) {
        const response = await api.put<ITask>(`/boards/${data.boardId}/sections/tasks/${data.taskId}`, {
            title: data.title,
            content: data.content,
            color: data.color
        });
        return response.data;
    },

    deleteTask: async function (data: IDeleteTaskParams) {
        const response = await api.delete(`/boards/${data.boardId}/sections/${data}/tasks/${data.taskId}`,);
        return response.data;
    },
    updateTasksPositions: async function ({ boardId, destinationSectionId, destinationTasksList, sourceSectionId, sourceTasksList }: IUpdateTasksPositionsParams) {
        const response = await api.put(`/boards/${boardId}/sections/tasks/updatePositions`, {
            sourceSectionId,
            destinationSectionId,
            sourceTasksList,
            destinationTasksList
        });

        return response.data;
    }
}