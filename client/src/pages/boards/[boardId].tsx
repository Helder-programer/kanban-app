import { useEffect, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import { boardService } from "@/services/board";
import { useRouter } from "next/router";
import { IBoard } from '@/types/IBoard';
import AppLayout from "@/components/layouts/appLayout";

function Board() {
    const router = useRouter();
    const [currentBoardInformations, setCurrentBoardInformations] = useState<IBoard>({} as IBoard);
    const boardId = String(router.query['boardId']);

    const getOneBoard = async () => {
        const board = await boardService.getOneBoard({ boardId });
        setCurrentBoardInformations(board);
    }

    useEffect(() => {
        try {
            getOneBoard();
        } catch (err: any) {
            console.log(err);
        }
    }, [boardId]);


    return (
        <AppLayout>
            <main className="px-2 py-3 d-flex flex-column w-100 h-100">
                <section id="icons-for-actions" className="d-flex w-100 justify-content-between pb-3 px-2">
                    <i className="text-custom-white">{currentBoardInformations?.favorite ? <AiFillStar className="fs-4" /> : <AiOutlineStar className="fs-4" />}</i>
                    <i><FaTrash className="fs-5 text-custom-red" /></i>
                </section>

                <section id="text-informations" className="px-5">
                    <input
                        value={currentBoardInformations.title}
                        className="w-100 bg-custom-black border-0 fs-2 text-custom-white p-0 outline-none fw-bold"
                        style={{ outline: 'none' }}
                        placeholder="Untitled"
                        type="text"

                    />
                    <textarea
                        value={currentBoardInformations.description}
                        className="w-100 pt-3 bg-custom-black border-0 text-custom-white p-0 outline-none"
                        style={{ outline: 'none', resize: 'none' }}
                        placeholder="Untitled"
                        cols={30}
                        rows={3}
                    ></textarea>

                </section>


            </main>
        </AppLayout>
    );
}

export default Board;