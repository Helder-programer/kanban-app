import { Button, Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';

import AppLayout from "@/components/layouts/appLayout";
import { boardService } from "@/services/board";
import { useBoards } from "@/contexts/boards";
import { getApiClient } from "@/services/apiUtils";
import { IBoard } from "@/types/IBoard";


function Home() {
    const boardsContext = useBoards();
    const [isLoading, setIsLoadind] = useState(false);
    const router = useRouter();

    const createBoard = async () => {
        try {
            setIsLoadind(true);
            const newBoard = await boardService.createBoard();
            boardsContext.setBoards(state => [...state, newBoard]);
            router.push(`/boards/${newBoard.board_id}`);
        } catch (err: any) {
            console.log(err);
        }
    };


    return (
        <AppLayout>
            <main className="d-flex w-100 h-100 justify-content-center align-items-center">
                {
                    isLoading ? <Spinner animation="border" variant="none" className="text" /> :
                        <Button variant="none" className="btn btn-outline-success fw-bold" onClick={() => createBoard()}>
                            CLICK HERE TO CREATE YOUR FIRST BOARD
                        </Button>
                }
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

    const response = await getApiClient(ctx).get<IBoard[]>('/boards');
    const boards = response.data;


    if (boards.length > 0)
        return {
            redirect: {
                destination: `/boards/${boards[0].board_id}`,
                permanent: false
            }
        }

    return {
        props: {}
    }
}

export default Home;