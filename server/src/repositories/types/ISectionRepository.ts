import { ISectionDocument } from "../../models/types/ISection";
import { ICreateSectionDTO } from "../section/dtos/ICreateSectionDTO";
import { IDeleteSectionDTO } from "../section/dtos/IDeleteSectionDTO";
import { IUpdateSectionDTO } from "../section/dtos/IUpdateSectionDTO";

export interface ISectionRepository {
    create(data: ICreateSectionDTO): Promise<ISectionDocument>;
    update(data: IUpdateSectionDTO): Promise<ISectionDocument>;
    deleteSection(data: IDeleteSectionDTO): Promise<void>;
}