import { IBoard } from "@/types/IBoard";
import { api } from "./api";
import { getApiClient } from "./apiUtils";

interface IUpdateBoardsPositionsParams {
    boards: IBoard[];
}
interface IUpdateFavoritesBoardsPositionsParams {
    boards: IBoard[];
}

interface IGetOneBoardParams {
    boardId: string;
    ctx?: any;
}

interface IDeleteBoardParams {
    boardId: string;
}

interface IUpdateBoardParams {
    title?: string;
    description?: string;
    favorite?: boolean;
    icon?: string;
    boardId: string;
}


export const boardService = {
    createBoard: async function () {
        const response = await api.post<IBoard>('/boards');
        return response.data;
    },

    getBoards: async function () {
        const response = await api.get<IBoard[]>('/boards');
        return response.data;
    },

    updateBoardsPositions: async function (data: IUpdateBoardsPositionsParams) {
        const response = await api.put('/boards', data);
        return response.data;
    },

    //Server Side
    getOneBoard: async function ({ boardId, ctx }: IGetOneBoardParams) {
        const api = getApiClient(ctx);
        const response = await api.get<IBoard>(`/boards/${boardId}`);
        return response.data;
    },

    deleteBoard: async function ({ boardId }: IDeleteBoardParams) {
        const response = await api.delete(`/boards/${boardId}`);
        return response.data;
    },
    updateBoard: async function ({ title, description, favorite, boardId, icon }: IUpdateBoardParams) {
        const response = await api.put<IBoard>(`/boards/${boardId}`, { title, description, favorite, icon });
        return response.data;
    },
    getFavorites: async function () {
        const response = await api.get<IBoard[]>('/boards/favorites');
        return response.data;
    },
    updateFavoritesBoardsPosition: async function ({ boards }: IUpdateFavoritesBoardsPositionsParams) {
        const response = await api.put('/boards/favorites', { boards });
        return response.data;
    }
}