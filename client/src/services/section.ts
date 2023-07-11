import { ISection } from "@/types/ISection";
import { api } from "./api";

interface ICreateSectionParams {
    boardId: string;
}

export const sectionService = {
    create: async function (data: ICreateSectionParams) {
        const response = await api.post<ISection>(`/boards/${data.boardId}/sections`);
        return response.data;
    }
}