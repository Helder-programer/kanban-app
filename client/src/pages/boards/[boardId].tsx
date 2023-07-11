import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { boardService } from "@/services/board";
import { useBoards } from '@/contexts/boards';
import { ISection } from '@/types/ISection';
import EmojiPicker from '@/components/common/emojiPicker';
import AppLayout from "@/components/layouts/appLayout";
import Kanban from '@/components/common/kanban';

type CurrentBoardInformations = {
    icon: string;
    title: string;
    description: string;
    favorite: boolean;
}


function Board() {
    const [currentBoardInformations, setCurrentBoardInformations] = useState<CurrentBoardInformations>({ title: '', description: '', icon: '', favorite: false });
    const [sections, setSections] = useState<ISection[]>([]);
    const boardsContext = useBoards();
    const router = useRouter();
    const boardId = String(router.query['boardId']);

    const deleteBoard = async () => {
        await boardService.deleteBoard({ boardId });

        const newBoards = [...boardsContext.boards];
        const index = newBoards.findIndex(board => board._id === boardId);
        newBoards.splice(index, 1);

        const newFavoritesBoards = [...boardsContext.favoritesBoards];
        const favoriteIndex = newFavoritesBoards.findIndex(board => board._id === boardId);
        newFavoritesBoards.splice(favoriteIndex, 1);

        boardsContext.setBoards(newBoards);
        boardsContext.setFavoritesBoards(newFavoritesBoards);



        try {
            await boardService.updateBoardsPositions({ boards: newBoards });
            await boardService.updateFavoritesBoardsPosition({ boards: newFavoritesBoards });
        } catch (err: any) {
            console.log(err);
        }


        if (newBoards.length > 0)
            return router.push(`/boards/${newBoards[0]._id}`);
        else
            return router.push('/');
    }

    const onIconChange = async (newIcon: string) => {
        let newBoards = [...boardsContext.boards];
        const index = newBoards.findIndex(board => board._id === boardId);
        newBoards[index] = { ...newBoards[index], icon: newIcon };
        boardsContext.setBoards(newBoards);


        if (currentBoardInformations.favorite) {
            let newFavoritesBoards = [...boardsContext.favoritesBoards];
            const index = newFavoritesBoards.findIndex(board => board._id === boardId);
            newFavoritesBoards[index] = { ...newFavoritesBoards[index], icon: newIcon };
            boardsContext.setFavoritesBoards(newFavoritesBoards);
        }

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

        if (currentBoardInformations.favorite) {
            let newFavoritesBoards = [...boardsContext.favoritesBoards];
            const index = newFavoritesBoards.findIndex(board => board._id === boardId);
            newFavoritesBoards[index] = { ...newFavoritesBoards[index], title: newTitle };
            boardsContext.setFavoritesBoards(newFavoritesBoards);
        }





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

        try {
            timer = setTimeout(async () => {
                await boardService.updateBoard({ boardId, description: newDescription });
            }, timeout);
        } catch (err: any) {
            console.log(err);
        }

    }

    const updateFavorite = async () => {
        const isFavorite = !currentBoardInformations.favorite;
        setCurrentBoardInformations({ ...currentBoardInformations, favorite: isFavorite });

        let newFavoritesBoards = [...boardsContext.favoritesBoards];
        const board = await boardService.getOneBoard({ boardId });


        if (isFavorite)
            newFavoritesBoards = [...newFavoritesBoards, board];
        else {
            const index = newFavoritesBoards.findIndex(board => board._id === boardId);
            newFavoritesBoards.splice(index, 1);
        }

        boardsContext.setFavoritesBoards(newFavoritesBoards);

        try {
            await boardService.updateBoard({ boardId, favorite: isFavorite });
        } catch (err: any) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getOne = async () => {
            const board = await boardService.getOneBoard({ boardId });

            setCurrentBoardInformations({
                title: board.title,
                description: board.description,
                icon: board.icon,
                favorite: board.favorite,
            });
            setSections(board.sections);
        }

        if (!router.isReady) return;

        getOne();
    }, [boardId]);



    return (
        <AppLayout>
            <main className="px-2 py-3 d-flex flex-column w-100 h-100" id="board-content">
                <section id="icons-for-actions" className="d-flex w-100 justify-content-between mb-3 px-2">
                    <i
                        className="text-custom-yellow"
                        style={{ cursor: 'pointer' }}
                        onClick={updateFavorite}
                        title='Favorite this board'
                    >
                        {currentBoardInformations?.favorite ? <AiFillStar className="fs-4" /> : <AiOutlineStar className="fs-4" />}
                    </i>
                    <i
                        style={{ cursor: 'pointer' }}
                        onClick={() => deleteBoard()}
                        title="Delete this board"
                    >
                        <FaTrash className="fs-5 text-custom-red" />
                    </i>
                </section>

                <section className="px-5" id="text">
                    <section id="text">
                        <div className="d-flex align-items-center gap-2">

                            <EmojiPicker icon={currentBoardInformations.icon} onChange={onIconChange} />
                            <input
                                value={currentBoardInformations.title}
                                className="w-100 bg-custom-black border-0 fs-2 text-custom-white p-0 outline-none fw-bold"
                                style={{ outline: 'none' }}
                                placeholder="Untitled"
                                type="text"
                                onChange={event => updateTitle(event)}

                            />
                        </div>
                        <textarea
                            value={currentBoardInformations.description}
                            className="w-100 mt-3 bg-custom-black border-0 text-custom-white p-0 outline-none ps-5"
                            style={{ outline: 'none', resize: 'none' }}
                            placeholder="Add description here..."
                            cols={30}
                            rows={3}
                            onChange={event => updateDescription(event)}
                        ></textarea>

                    </section>


                    <Kanban sections={sections} setSections={setSections} />
                </section>

            </main>
        </AppLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'kanban-token': token } = parseCookies(ctx);

    if (!token)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }


    return {
        props: {}
    }
}

export default Board;