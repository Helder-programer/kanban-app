import { ITaskDocument } from "../../models/types/ITaskDocument";
import { ICreateTaskDTO } from "../task/dtos/ICreateTaskDTO";
import { IUpdateTaskDTO } from "../task/dtos/IUpdateTaskDTO";

export interface ITaskRepository {
    create(data: ICreateTaskDTO): Promise<ITaskDocument>;
    update(data: IUpdateTaskDTO): Promise<ITaskDocument>;
}