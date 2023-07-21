import { ITaskDocument } from "../../../models/types/ITaskDocument";

export interface IUpdateTasksPositionsDTO {
    boardId: string;
    sourceSectionId: string;
    destinationSectionId: string;
    sourceTasksList: ITaskDocument[];
    destinationTasksList: ITaskDocument[];
}