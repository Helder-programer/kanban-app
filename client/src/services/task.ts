import { ITask } from "@/types/ITask";
import { api } from "./api";

interface ICreateTaskParams {
    sectionId: string;
    boardId: string;
}

interface IUpdateTaskParams {
    boardId?: string;
    title?: string;
    content?: string;
    taskId?: string;
}

export const taskService = {
    create: async function (data: ICreateTaskParams) {
        const response = await api.post<ITask>(`/boards/${data.boardId}/tasks`, { sectionId: data.sectionId });
        return response.data;
    },

    update: async function (data: IUpdateTaskParams) {
        const response = await api.put<ITask>(`/boards/${data.boardId}/tasks/${data.taskId}`, { title: data.title, content: data.content });
        return response.data;
    }
}