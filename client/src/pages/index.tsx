import { Button, Container } from "react-bootstrap";

import Sidebar from "@/components/common/sidebar";
import AppLayout from "@/components/layouts/appLayout";
import { boardService } from "@/services/board";
import { useBoards } from "@/contexts/boards";
import Router from "next/router";
import { useEffect } from "react";


function Home() {
    const boardsContext = useBoards();

    const createBoard = async () => {
        try {
            const newBoard = await boardService.create();
            boardsContext.setBoards(state => [...state, newBoard]);
            Router.push(`/boards/${newBoard._id}`);
        } catch (err: any) {
            console.log(err);
        }
    };

    useEffect(() => {

        boardService.getBoards().then(boards => {
            if (boards.length > 0) {
                Router.push(`/boards/${boards[0]._id}`);
            }
        });

    }, []);


    return (
        <AppLayout>
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">
                <Button variant="none" className="btn btn-outline-custom-green" onClick={() => createBoard()}>
                    CLICK HERE TO CREATE YOUR FIRST BOARD
                </Button>
            </main>
        </AppLayout>
    );
}

export default Home;