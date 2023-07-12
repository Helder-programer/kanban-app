import { ISection } from "@/types/ISection";
import { api } from "./api";

interface ICreateSectionParams {
    boardId: string;
}

interface IDeleteSectionParams {
    boardId: string;
    sectionId: string;
}

interface IUpdateSectionParams {
    boardId: string;
    sectionId: string;
    title: string;
}

export const sectionService = {
    create: async function (data: ICreateSectionParams) {
        const response = await api.post<ISection>(`/boards/${data.boardId}/sections`);
        return response.data;
    },
    update: async function (data: IUpdateSectionParams) {
        const response = await api.put(`/boards/${data.boardId}/sections/${data.sectionId}`, { title: data.title });
        return response.data;
    },
    deleteSection: async function (data: IDeleteSectionParams) {
        const response = await api.delete(`/boards/${data.boardId}/sections/${data.sectionId}`);
        return response.data;
    }
}