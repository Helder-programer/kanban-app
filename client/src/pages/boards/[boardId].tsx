import { useEffect } from 'react';

import AppLayout from "@/components/layouts/appLayout";
import { boardService } from "@/services/board";
import { useRouter } from "next/router";

function Board() {
    const router = useRouter();
    const boardId = String(router.query['boardId']);

    const getOneBoard = async () => {
        const boards = await boardService.getOneBoard({ boardId });

    }

    useEffect(() => {
        getOneBoard();
    }, [boardId]);


    return (
        <AppLayout>
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">

                Board

            </main>
        </AppLayout>
    );
}

export default Board;