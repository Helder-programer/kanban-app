import { IBoardDocument } from "../../models/types/IBoardDocument";
import { IFindOneDTO } from "../board/dtos/IFindOneDTO";

export interface IBoardRepostiory {
    create: (userId: string) => Promise<IBoardDocument>;
    findAll: (userId: string) => Promise<IBoardDocument[]>;
    updateBoardsPositions: (boards: IBoardDocument[]) => Promise<void>;
    findOne: (data: IFindOneDTO) => Promise<IBoardDocument>;
}