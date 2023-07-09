import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { boardService } from "@/services/board";
import { IBoard } from '@/types/IBoard';
import { useBoards } from '@/contexts/boards';
import { getApiClient } from '@/services/apiUtils';
import AppLayout from "@/components/layouts/appLayout";
import { Button } from 'react-bootstrap';
import EmojiPicker from '@/components/common/emojiPicker';

interface IProps {
    board: IBoard;
}

type CurrentBoardInformations = {
    icon: string;
    title: string;
    description: string;
    favorite: boolean;
}


function Board({ board }: IProps) {
    const [currentBoardInformations, setCurrentBoardInformations] = useState<CurrentBoardInformations>({ title: '', description: '', icon: '', favorite: false });
    const boardsContext = useBoards();
    const router = useRouter();
    const boardId = board._id;

    const deleteBoard = async () => {
        try {
            await boardService.deleteBoard({ boardId });

            const newBoards = [...boardsContext.boards];
            const index = newBoards.findIndex(board => board._id === boardId);
            newBoards.splice(index, 1);


            boardsContext.setBoards(newBoards);
            await boardService.updateBoardsPositions({ boards: newBoards });

        } catch (err: any) {
            console.log(err);
        }
    }

    const onIconChange = async (newIcon: string) => {
        let newBoards = [...boardsContext.boards];
        const index = newBoards.findIndex(board => board._id === boardId);
        newBoards[index] = { ...newBoards[index], icon: newIcon };
        setCurrentBoardInformations({ ...currentBoardInformations, icon: newIcon });
        boardsContext.setBoards(newBoards);
        try {
            await boardService.updateBoard({ boardId, icon: newIcon });
        } catch (err: any) {
            console.log(err);
        }
    }


    const updateTitle = async (event: ChangeEvent<HTMLInputElement>) => {
        let timer;
        const timeout = 600;
        clearTimeout(timer);

        let newTitle = event.target.value;
        setCurrentBoardInformations({ ...currentBoardInformations, title: newTitle });
        let newBoards = [...boardsContext.boards];
        const index = newBoards.findIndex(board => board._id === boardId);
        newBoards[index] = { ...newBoards[index], title: newTitle };
        boardsContext.setBoards(newBoards);

        try {
            timer = setTimeout(async () => {
                await boardService.updateBoard({ boardId, title: newTitle });
            }, timeout);
        } catch (err: any) {
            console.log(err);
        }
    }

    const updateDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        let timer;
        const timeout = 600;

        clearTimeout(timer);

        let newDescription = event.target.value;
        setCurrentBoardInformations({ ...currentBoardInformations, description: newDescription });
        let newBoards = [...boardsContext.boards];
        const index = newBoards.findIndex(board => board._id === boardId);
        newBoards[index] = { ...newBoards[index], description: newDescription };
        boardsContext.setBoards(newBoards);

        try {
            timer = setTimeout(async () => {
                await boardService.updateBoard({ boardId, description: newDescription });
            }, timeout);
        } catch (err: any) {
            console.log(err);
        }

    }

    const updateFavorite = () => {
        const isFavorite = !currentBoardInformations.favorite;
        setCurrentBoardInformations({ ...currentBoardInformations, favorite: isFavorite });
    }

    useEffect(() => {
        setCurrentBoardInformations({
            title: board.title,
            description: board.description,
            icon: board.icon,
            favorite: board.favorite
        });
    }, [board._id]);

    useEffect(() => {
        if (boardsContext.boards.length === 0) router.push('/');
    }, [boardsContext.boards]);




    return (
        <AppLayout>
            <main className="px-2 py-3 d-flex flex-column w-100 h-100">
                <section id="icons-for-actions" className="d-flex w-100 justify-content-between pb-3 px-2">
                    <i
                        className="text-custom-yellow"
                        style={{ cursor: 'pointer' }}
                        onClick={updateFavorite}
                    >
                        {currentBoardInformations?.favorite ? <AiFillStar className="fs-4" /> : <AiOutlineStar className="fs-4" />}
                    </i>
                    <i
                        style={{ cursor: 'pointer' }}
                        onClick={deleteBoard}
                    >
                        <FaTrash className="fs-5 text-custom-red" />
                    </i>
                </section>

                <section className="px-5" id="board-informations">


                    <section id="text">
                        <div className="d-flex align-items-center gap-2">

                            <EmojiPicker icon={currentBoardInformations.icon} onChange={onIconChange} />
                            <input
                                value={currentBoardInformations.title}
                                className="w-100 bg-custom-black border-0 fs-2 text-custom-white p-0 outline-none fw-bold"
                                style={{ outline: 'none' }}
                                placeholder="Untitled"
                                type="text"
                                onChange={updateTitle}

                            />
                        </div>
                        <textarea
                            value={currentBoardInformations.description}
                            className="w-100 mt-3 bg-custom-black border-0 text-custom-white p-0 outline-none ps-3"
                            style={{ outline: 'none', resize: 'none' }}
                            placeholder="Add description here..."
                            cols={30}
                            rows={3}
                            onChange={updateDescription}
                        ></textarea>

                    </section>

                    <div className="d-flex w-100 mt-3 justify-content-between align-items-center">
                        <Button variant="none" className="btn-outline-custom-black-light text-primary  border-0">
                            Add Section
                        </Button>

                        <span className="text-custom-white pe-4">
                            {board.sections.length}  Sections
                        </span>

                    </div>
                    <hr className="text-white mt-1" />
                </section>

            </main>
        </AppLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const api = getApiClient(ctx);
    const { boardId } = ctx.query;
    const response = await api.get<IBoard>(`/boards/${boardId}`);
    const board = JSON.parse(JSON.stringify(response.data));

    return {

        props: {
            board
        }
    }
}

export default Board;