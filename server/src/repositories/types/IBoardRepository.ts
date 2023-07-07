import { IBoardDocument } from "../../models/types/IBoardDocument";
import { ICreateBoardDTO } from "../board/dtos/ICreateBoardDTO";
import { IFindAllDTO } from "../board/dtos/IFindAllDTO";
import { IFindOneDTO } from "../board/dtos/IFindOneDTO";
import { IUpdateBoardsPositionsDTO } from "../board/dtos/IUpdateBoardsPositionsDTO";

export interface IBoardRepostiory {
    create: (data: ICreateBoardDTO) => Promise<IBoardDocument>;
    findAll: (data: IFindAllDTO) => Promise<IBoardDocument[]>;
    updateBoardsPositions: (data: IUpdateBoardsPositionsDTO) => Promise<void>;
    findOne: (data: IFindOneDTO) => Promise<IBoardDocument>;
}