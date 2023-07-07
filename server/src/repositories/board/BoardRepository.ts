import Board from "../../models/Board";
import Section from "../../models/Section";
import Task from "../../models/Task";
import { NotFoundError } from "../../helpers/apiErrors";
import { IBoardRepostiory } from "../types/IBoardRepository";
import { IFindOneDTO } from "./dtos/IFindOneDTO";
import { ICreateBoardDTO } from "./dtos/ICreateBoardDTO";
import { ICountBoardsDTO } from "./dtos/ICountBoardsDTO";
import { IUpdateBoardsPositionsDTO } from "./dtos/IUpdateBoardsPositionsDTO";
import { IFindAllDTO } from "./dtos/IFindAllDTO";

export class BoardRepository implements IBoardRepostiory {

    public async create({ userId }: ICreateBoardDTO) {
        const boardsQuantity = await this.countBoards({ userId });
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = new Board({ user: userId, position });
        await board.save();
        return board;
    }

    public async findAll({ userId }: IFindAllDTO) {
        const boards = await Board.find({ user: userId }).sort('position');
        return boards;
    }

    private async countBoards({ userId }: ICountBoardsDTO) {
        const boardsQuantity = await Board.find({ user: userId, }).count();
        return boardsQuantity;
    }

    public async findOne({ boardId, userId }: IFindOneDTO) {
        const searchedBoard: any = await Board.findOne({ _id: boardId, user: userId });
        if (!searchedBoard) throw new NotFoundError('Board not found!');

        const sections: any = await Section.find({ board: boardId });

        for (let section of sections) {
            let tasks = await Task.find({ section: section._id }).populate('section').sort('position');
            section._doc.tasks = tasks;
        }

        searchedBoard._doc.sections = sections;
        return searchedBoard;
    }

    public async updateBoardsPositions({ boards }: IUpdateBoardsPositionsDTO) {
        for (let index in boards) {
            let board = boards[index];
            await Board.findByIdAndUpdate(board._id, { $set: { position: index } });
        }
    }


}