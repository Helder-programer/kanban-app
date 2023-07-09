import Board from "../../models/Board";
import Section from "../../models/Section";
import Task from "../../models/Task";
import { NotFoundError } from "../../helpers/apiErrors";
import { IBoardRepostiory } from "../types/IBoardRepository";
import { IFindOneDTO } from "./dtos/IFindOneDTO";
import { ICreateBoardDTO } from "./dtos/ICreateBoardDTO";
import { IUpdateBoardsPositionsDTO } from "./dtos/IUpdateBoardsPositionsDTO";
import { IFindAllDTO } from "./dtos/IFindAllDTO";
import { IDeleteBoardDTO } from "./dtos/IDeleteBoardDTO";
import { IUpdateBoardDTO } from "./dtos/IUpdateBoardDTO";
import { IBoardDocument } from "../../models/types/IBoardDocument";
import { Types } from "mongoose";

export class BoardRepository implements IBoardRepostiory {

    public async create({ userId }: ICreateBoardDTO) {
        const boardsQuantity = await this.countBoards(userId);
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = new Board({ user: userId, position });
        await board.save();
        return board;
    }

    public async findAll({ userId }: IFindAllDTO) {
        const boards = await Board.find({ user: userId }).sort('position');
        return boards;
    }

    private async countBoards(userId: Types.ObjectId | string) {
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
            await Board.findByIdAndUpdate(board._id, { position: index });
        }
    }

    public async deleteBoard({ userId, boardId }: IDeleteBoardDTO) {
        await Board.findOneAndDelete({ _id: boardId, user: userId });
    }

    public async update({ title, description, favorite, boardId, userId, icon }: IUpdateBoardDTO): Promise<IBoardDocument> {
        const boardToUpdate = await Board.findOne({ user: userId, _id: boardId });
        let favoritePosition = 0;

        if (!title) title = 'Untilted';
        if (!description) description = 'Add description here...';

        if (!boardToUpdate) throw new NotFoundError('Board not found!');

        if (favorite != boardToUpdate.favorite) {
            const favoritesBoards = await this.findFavorites(userId, boardId);

            if (favorite) {
                favoritePosition = favoritesBoards.length > 0 ? favoritesBoards.length : 0;
            } else {
                await this.updateFavoritesPositions(favoritesBoards);
            }
        }

        boardToUpdate.set({ title, description, favorite, favoritePosition, icon });
        boardToUpdate.save();
        return boardToUpdate;


    }

    private async findFavorites(userId: Types.ObjectId | string, boardId: Types.ObjectId | string) {
        const favoritesBoards = await Board.find({ user: userId, favorite: true, _id: { $ne: boardId ?? '' } });
        return favoritesBoards;
    }

    private async updateFavoritesPositions(boards: IBoardDocument[]) {
        for (let index in boards) {
            await boards[index].updateOne({ favoritePosition: index });
        }
    }

}