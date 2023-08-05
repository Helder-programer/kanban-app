import { IBoard } from "../../models/types/IBoard";
import { ICreateBoardDTO } from "../board/dtos/ICreateBoardDTO";
import { IDeleteBoardDTO } from "../board/dtos/IDeleteBoardDTO";
import { IFindAllDTO } from "../board/dtos/IFindAllDTO";
import { IFindFavoritesDTO } from "../board/dtos/IFindFavoritesDTO";
import { IFindOneDTO } from "../board/dtos/IFindOneDTO";
import { IUpdateBoardDTO } from "../board/dtos/IUpdateBoardDTO";
import { IUpdateBoardsPositionsDTO } from "../board/dtos/IUpdateBoardsPositionsDTO";
import { IUpdateFavoritesPositionDTO } from "../board/dtos/IUpdateFavoritesPositionDTO";

export interface IBoardRepostiory {
    create(data: ICreateBoardDTO): Promise<IBoard>;
    update(data: IUpdateBoardDTO): Promise<IBoard>;
    findAll(data: IFindAllDTO): Promise<IBoard[]>;
    updateBoardsPositions (data: IUpdateBoardsPositionsDTO): Promise<void>;
    findOne(data: IFindOneDTO): Promise<IBoard>;
    deleteBoard(data: IDeleteBoardDTO): Promise<void>;
    findFavorites(data: IFindFavoritesDTO): Promise<IBoard[]>;
    updateFavoritesBoardsPositions(data: IUpdateFavoritesPositionDTO): Promise<void>;
}