import { IBoardDocument } from "../../models/types/IBoardDocument";

export interface IBoardRepostiory {
    create: (userId: string) => Promise<IBoardDocument>;
    findAll: (userId: string) => Promise<IBoardDocument[]>;
}