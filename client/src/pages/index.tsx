import { Button, Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseCookies } from "nookies";

import AppLayout from "@/components/layouts/appLayout";
import { boardService } from "@/services/board";
import { useBoards } from "@/contexts/boards";
import { getApiClient } from "@/services/apiUtils";
import { IBoard } from "@/types/IBoard";


function Home() {
    const boardsContext = useBoards();
    const router = useRouter();

    const createBoard = async () => {
        try {
            const newBoard = await boardService.createBoard();
            boardsContext.setBoards(state => [...state, newBoard]);
            router.push(`/boards/${newBoard._id}`);
        } catch (err: any) {
            console.log(err);
        }
    };


    return (
        <AppLayout>
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">
                <Button variant="none" className="btn btn-outline-custom-green fw-bold" onClick={() => createBoard()}>
                    CLICK HERE TO CREATE YOUR FIRST BOARD
                </Button>
            </main>
        </AppLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {

        const { 'kanban-token': token } = parseCookies(ctx);
        const response = await getApiClient(ctx).get<IBoard[]>('/boards');
        const boards = response.data;



        if (!token)
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }



        if (boards.length > 0)
            return {
                redirect: {
                    destination: `/boards/${boards[0]._id}`,
                    permanent: false
                }
            }



    } catch (err: any) {
        console.log(err);
    }

    return {
        props: {}
    }
}

export default Home;