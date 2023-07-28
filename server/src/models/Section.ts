import { Model, DataType, Table, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ISection } from "./types/ISection";
import Board from "./Board";
import { IBoard } from "./types/IBoard";

@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_sections',
})
export default class Section extends Model implements ISection {
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
    @Column(DataType.UUIDV4)
    declare board_id: string;

    @BelongsTo(() => Board, 'board_id')
    declare board: IBoard;
}
