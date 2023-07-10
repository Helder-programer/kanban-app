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
            await Board.findByIdAndUpdate(boards[index]._id, { position: index });
        }
    }

    public async deleteBoard({ userId, boardId }: IDeleteBoardDTO) {
        await Board.findOneAndDelete({ _id: boardId, user: userId });
    }

    public async update({ title, description, favorite, boardId, userId, icon }: IUpdateBoardDTO): Promise<IBoardDocument> {
        const boardToUpdate = await Board.findOne({ user: userId, _id: boardId });
        let favoritePosition = 0;

        if (!boardToUpdate) throw new NotFoundError('Board not found!');

        if (favorite != boardToUpdate.favorite) {
            const favoritesBoards = await this.findFavorites({ userId, boardId });

            if (favorite) {
                favoritePosition = favoritesBoards.length > 0 ? favoritesBoards.length : 0;
            } else {
                await this.updateFavoritesBoardsPositions({boards: favoritesBoards});
            }
        }

        let objectToUpdate: any = {}
        if (title) objectToUpdate.title = title;
        if (description) objectToUpdate.description = description;
        if (icon) objectToUpdate.icon = icon;

        if (favorite !== undefined)
            objectToUpdate.favorite = favorite;


        console.log(objectToUpdate.favorite);
        boardToUpdate.set({ ...objectToUpdate, favoritePosition });
        boardToUpdate.save();
        return boardToUpdate;


    }

    public async findFavorites({ boardId, userId }: IFindFavoritesDTO) {
        if (boardId) {
            const favoritesBoards = await Board.find({ user: userId, favorite: true, _id: { $ne: boardId } }).sort('position');
            return favoritesBoards;
        }

        const favoritesBoards = await Board.find({ user: userId, favorite: true }).sort('position');
        return favoritesBoards;

    }

    public async updateFavoritesBoardsPositions({boards}: IUpdateFavoritesPositionDTO) {
        for (let index in boards) {
            await Board.findByIdAndUpdate(boards[index]._id, {favoritePosition: index});
        }
    }

}