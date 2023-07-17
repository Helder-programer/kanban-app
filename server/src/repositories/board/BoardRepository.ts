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
import { IFindFavoritesDTO } from "./dtos/IFindFavoritesDTO";
import { IUpdateFavoritesPositionDTO } from "./dtos/IUpdateFavoritesPositionDTO";

export class BoardRepository implements IBoardRepostiory {

    public async create(data: ICreateBoardDTO) {
        const boardsQuantity = await this.countBoards(data.userId);
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = new Board({ user: data.userId, position });
        await board.save();
        return board;
    }

    public async findAll(data: IFindAllDTO) {
        const boards = await Board.find({ user: data.userId }).sort('position');
        return boards;
    }

    private async countBoards(userId: Types.ObjectId | string) {
        const boardsQuantity = await Board.find({ user: userId, }).count();
        return boardsQuantity;
    }

    public async findOne(data: IFindOneDTO) {
        const searchedBoard: any = await Board.findOne({ _id: data.boardId, user: data.userId });
        if (!searchedBoard) throw new NotFoundError('Board not found!');

        const sections: any = await Section.find({ board: data.boardId });

        for (let section of sections) {
            let tasks = await Task.find({ section: section._id }).populate('section').sort('position');
            section._doc.tasks = tasks;
        }

        searchedBoard._doc.sections = sections;
        return searchedBoard;
    }

    public async updateBoardsPositions(data: IUpdateBoardsPositionsDTO) {
        for (let index in data.boards) {
            await Board.findByIdAndUpdate(data.boards[index]._id, { position: index });
        }
    }

    public async deleteBoard(data: IDeleteBoardDTO) {
        await Board.findOneAndDelete({ _id: data.boardId, user: data.userId });
         
    }

    public async update(data: IUpdateBoardDTO): Promise<IBoardDocument> {
        const boardToUpdate = await Board.findOne({ user: data.userId, _id: data.boardId });
        let favoritePosition = 0;

        if (!boardToUpdate) throw new NotFoundError('Board not found!');

        if (data.favorite != boardToUpdate.favorite) {
            const favoritesBoards = await this.findFavorites({ userId: data.userId, boardId: data.boardId });

            if (data.favorite) {
                favoritePosition = favoritesBoards.length > 0 ? favoritesBoards.length : 0;
            } else {
                await this.updateFavoritesBoardsPositions({boards: favoritesBoards});
            }
        }

        let objectToUpdate: any = {}
        if (data.title) objectToUpdate.title = data.title;
        if (data.description) objectToUpdate.description = data.description;
        if (data.icon) objectToUpdate.icon = data.icon;

        if (data.favorite !== undefined)
            objectToUpdate.favorite = data.favorite;

        boardToUpdate.set({ ...objectToUpdate, favoritePosition });
        boardToUpdate.save();
        return boardToUpdate;


    }

    public async findFavorites(data: IFindFavoritesDTO) {
        if (data.boardId) {
            const favoritesBoards = await Board.find({ user: data.userId, favorite: true, _id: { $ne: data.boardId } }).sort('position');
            return favoritesBoards;
        }

        const favoritesBoards = await Board.find({ user: data.userId, favorite: true }).sort('position');
        return favoritesBoards;

    }

    public async updateFavoritesBoardsPositions({boards}: IUpdateFavoritesPositionDTO) {
        for (let index in boards) {
            await Board.findByIdAndUpdate(boards[index]._id, {favoritePosition: index});
        }
    }

}