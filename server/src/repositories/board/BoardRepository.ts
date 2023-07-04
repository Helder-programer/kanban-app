import Board from "../../models/Board";
import { IBoardRepostiory } from "../types/IBoardRepository";

export class BoardRepository implements IBoardRepostiory {

    public async create(userId: string) {
        const boardsQuantity = await this.countBoards(userId);
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = new Board({ user: userId, position });
        await board.save();
        return board;
    }

    public async findAll(userId: string) {
        const boards = await Board.find({ user: userId }).sort('-position');
        return boards;
    }

    private async countBoards(userId: string) {
        const boardsQuantity = await Board.find({ user: userId, }).count();
        return boardsQuantity;
    }
}