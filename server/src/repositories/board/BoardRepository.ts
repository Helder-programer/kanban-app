import Board from "../../models/Board";
import Section from "../../models/Section";
import { NotFoundError } from "../../helpers/apiErrors";
import { IBoardDocument } from "../../models/types/IBoardDocument";
import { IBoardRepostiory } from "../types/IBoardRepository";
import { IFindOneDTO } from "./dtos/IFindOneDTO";
import { Types } from "mongoose";

export class BoardRepository implements IBoardRepostiory {

    public async create(userId: string) {
        const boardsQuantity = await this.countBoards(userId);
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = new Board({ user: userId, position });
        await board.save();
        return board;
    }

    public async findAll(userId: string) {
        const boards = await Board.find({ user: userId }).sort('position');
        return boards;
    }

    private async countBoards(userId: string) {
        const boardsQuantity = await Board.find({ user: userId, }).count();
        return boardsQuantity;
    }

    public async findOne({ boardId, userId }: IFindOneDTO) {
        const searchedBoard = await Board.findById(boardId).findOne({ user: userId });
        console.log(searchedBoard);
        if (!searchedBoard) throw new NotFoundError('Board not found!');
        const sections = await Section.find({ board: boardId });
        searchedBoard.sections = sections;
        return searchedBoard;
    }

    public async updateBoardsPositions(boards: IBoardDocument[]) {
        for (let index in boards) {
            let board = boards[index];
            await Board.findByIdAndUpdate(board._id, { $set: { position: index } });
        }
    }


}