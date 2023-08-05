import { ISection } from "../../models/types/ISection";
import { ICreateSectionDTO } from "../section/dtos/ICreateSectionDTO";
import { IDeleteSectionDTO } from "../section/dtos/IDeleteSectionDTO";
import { IUpdateSectionDTO } from "../section/dtos/IUpdateSectionDTO";

export interface ISectionRepository {
    create(data: ICreateSectionDTO): Promise<ISection>;
    update(data: IUpdateSectionDTO): Promise<ISection>;
    deleteSection(data: IDeleteSectionDTO): Promise<void>;
}