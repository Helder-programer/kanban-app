import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ISection } from "./types/ISection";
import Board from "./Board";
import { IBoard } from "./types/IBoard";
import Task from "./Task";
import { ITask } from "./types/ITask";

@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_sections',
})
export default class Section extends Model<Partial<ISection>> implements ISection {
    @Column({
        primaryKey: true,
        type: DataType.CHAR
    })
    declare section_id: string;

    @Column(DataType.STRING)
    declare title: string;

    @Column(DataType.DATE)
    declare created_at: Date;

    @Column(DataType.DATE)
    declare updated_at: Date;



    
    @ForeignKey(() => Board)
    @Column(DataType.CHAR)
    declare board_id: string;

    @BelongsTo(() => Board, 'board_id')
    declare board: IBoard;

    @HasMany(() => Task, 'section_id')
    declare tasks: ITask[];
}
