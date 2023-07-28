import { ITaskDocument } from "../../../models/types/ITask";

export interface IUpdateTasksPositionsDTO {
    boardId: string;
    sourceSectionId: string;
    destinationSectionId: string;
    sourceTasksList: ITaskDocument[];
    destinationTasksList: ITaskDocument[];
}