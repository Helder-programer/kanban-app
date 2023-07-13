import { ITask } from "@/types/ITask";
import { api } from "./api";

interface ICreateTaskParams {
    sectionId: string;
    boardId: string;
}

export const taskService = {
    create: async function (data: ICreateTaskParams) {
        const response = await api.post<ITask>(`/boards/${data.boardId}/tasks`, { sectionId: data.sectionId });
        return response.data;
    }
}