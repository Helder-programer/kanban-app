import { IBoard } from "@/types/IBoard";
import { api } from "./api";

export const boardService = {
    create: async function() {
        const response = await api.post<IBoard>('/boards');
        return response.data;
    },
    
}