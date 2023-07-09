import { IBoardDocument } from "../../models/types/IBoardDocument";
import { ICreateBoardDTO } from "../board/dtos/ICreateBoardDTO";
import { IDeleteBoardDTO } from "../board/dtos/IDeleteBoardDTO";
import { IFindAllDTO } from "../board/dtos/IFindAllDTO";
import { IFindOneDTO } from "../board/dtos/IFindOneDTO";
import { IUpdateBoardDTO } from "../board/dtos/IUpdateBoardDTO";
import { IUpdateBoardsPositionsDTO } from "../board/dtos/IUpdateBoardsPositionsDTO";

export interface IBoardRepostiory {
    create: (data: ICreateBoardDTO) => Promise<IBoardDocument>;
    update: (data: IUpdateBoardDTO) => Promise<IBoardDocument>;
    findAll: (data: IFindAllDTO) => Promise<IBoardDocument[]>;
    updateBoardsPositions: (data: IUpdateBoardsPositionsDTO) => Promise<void>;
    findOne: (data: IFindOneDTO) => Promise<IBoardDocument>;
    deleteBoard:(data: IDeleteBoardDTO) => Promise<void>;
}