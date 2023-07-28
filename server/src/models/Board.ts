import { Model, DataType, Table, Column, HasMany } from "sequelize-typescript";
import { IBoard } from "./types/IBoard";
import connection from "../database";
import Section from "./Section";
import { ISection } from "./types/ISection";


@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'tb_boards',
})
export default class Board extends Model<IBoard> {

    @Column({ 
        primaryKey: true,
        type: DataType.CHAR
     })
    declare board_id: string;

    @Column(DataType.STRING)
    declare icon: string;
    @Column(DataType.STRING)
    declare title: string;
    @Column(DataType.STRING)
    declare position: string;
    @Column(DataType.BOOLEAN)
    declare favorite: boolean;
    @Column(DataType.INTEGER)
    declare favorite_position: number;
    @Column(DataType.DATE)
    declare created_at: Date;
    @Column(DataType.DATE)
    declare updated_at: Date;

    @HasMany(() => Section, 'board_id')
     declare sections: ISection[];
}