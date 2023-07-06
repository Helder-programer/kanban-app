import { IBoard } from "@/types/IBoard";
import { api } from "./api";

interface IUpdateBoardPositionParams {
    boards: IBoard[];
}

interface IGetOneBoardParams {
    boardId: string;
}


export const boardService = {
    create: async function () {
        const response = await api.post<IBoard>('/boards');
        return response.data;
    },

    getBoards: async function () {
        const response = await api.get<IBoard[]>('/boards');
        return response.data;
    },

    updateBoardPosition: async function (data: IUpdateBoardPositionParams) {
        await api.put('/boards', data);
    },

    getOneBoard: async function ({ boardId }: IGetOneBoardParams) {
        const response = await api.get<IBoard>(`/boards/${boardId}`);
        console.log(response.data);
    }

}