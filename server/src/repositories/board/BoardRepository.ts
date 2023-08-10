import { v4 as uuidv4 } from 'uuid';

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
import { IFindFavoritesDTO } from "./dtos/IFindFavoritesDTO";
import { IUpdateFavoritesPositionDTO } from "./dtos/IUpdateFavoritesPositionDTO";
import sequelize, { Op } from 'sequelize';

export class BoardRepository implements IBoardRepostiory {

    public async create(data: ICreateBoardDTO) {
        const boardsQuantity = await this.countBoards(data.userId);
        const boardId = uuidv4();
        const position = boardsQuantity > 0 ? boardsQuantity : 0;

        const board = await Board.create({
            board_id: boardId,
            user_id: data.userId,
            position
        });

        return board;
    }

    public async findAll(data: IFindAllDTO) {
        const boards = await Board.findAll({
            where: {
                user_id: data.userId
            }
        });

        boards.sort((a, b) => {
            if (a.position > b.position) return 1;
            if (a.position < b.position) return -1;
            return 0;
        });

        return boards;
    }

    private async countBoards(userId: string) {
        const boardsQuantity = (await Board.findAll({ where: { user_id: userId } })).length;
        return boardsQuantity;
    }

    public async findOne(data: IFindOneDTO) {
        const searchedBoard = await Board.findOne({
            where: {
                user_id: data.userId,
                board_id: data.boardId
            },
            include: [
                {
                    model: Section,
                    as: 'sections',
                    include: [{ model: Task, order: [['position', 'ASC']] }],
                    required: false,
                }
            ]
        });

        if (!searchedBoard) throw new NotFoundError('Board not found!');

        return searchedBoard!;
    }

    public async updateBoardsPositions(data: IUpdateBoardsPositionsDTO) {
        for (let index in data.boards) {
            await Board.update({ position: Number(index) }, { where: { board_id: data.boards[index].board_id } });
        }
    }

    public async deleteBoard(data: IDeleteBoardDTO) {
        const boardToDelete = await Board.findOne({
            where: {
                user_id: data.userId,
                board_id: data.boardId
            }
        });
        if (!boardToDelete) throw new NotFoundError('Board not found!');
        await boardToDelete.destroy();
    }

    public async update(data: IUpdateBoardDTO) {
        const boardToUpdate = await Board.findOne({
            where: {
                user_id: data.userId,
                board_id: data.boardId
            }
        });

        let favoritePosition = 0;

        if (!boardToUpdate) throw new NotFoundError('Board not found!');

        if (data.favorite != boardToUpdate.favorite) {
            const favoritesBoards = await this.findFavoritesWithoutSearchedBoard(data.boardId, data.userId);

            if (data.favorite) {
                favoritePosition = favoritesBoards.length > 0 ? favoritesBoards.length : 0;
            } else {
                await this.updateFavoritesBoardsPositions({ boards: favoritesBoards });
            }
        }

        let objectToUpdate: any = {}
        if (data.title) objectToUpdate.title = data.title;
        if (data.description) objectToUpdate.description = data.description;
        if (data.icon) objectToUpdate.icon = data.icon;

        if (data.favorite !== undefined)
            objectToUpdate.favorite = data.favorite;

        boardToUpdate.set({ ...objectToUpdate, favorite_position: favoritePosition });
        await boardToUpdate.save();
        return boardToUpdate;
    }

    public async findFavorites(data: IFindFavoritesDTO) {
        const favoritesBoards = await Board.findAll({
            where: {
                user_id: data.userId,
                favorite: true
            }
        });
        return favoritesBoards;
    }


    private async findFavoritesWithoutSearchedBoard(boardId: string, userId: string) {
        const favoritesBoards = await Board.findAll({
            where: {
                user_id: userId,
                favorite: true,
                board_id: { [Op.not]: boardId }
            },
            order: ['favorite_position']
        });

        return favoritesBoards;
    }

    public async updateFavoritesBoardsPositions({ boards }: IUpdateFavoritesPositionDTO) {
        for (let index in boards) {
            await Board.update({ favorite_position: Number(index) }, { where: { board_id: boards[index].board_id } });
        }
    }

}