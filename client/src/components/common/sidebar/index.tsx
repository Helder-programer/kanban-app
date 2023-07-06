import styled from 'styled-components';
import { ListGroup } from "react-bootstrap";
import { BiLogOut } from 'react-icons/bi';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { DropResult } from 'react-beautiful-dnd';

import { useAuth } from "@/contexts/auth";
import { boardService } from '@/services/board';
import { useBoards } from '@/contexts/boards';
import BoardsList from './boardsList';



interface IProps {
    className?: string;
}


function Sidebar({ className }: IProps) {
    const [activeBoardIndex, setActiveBoardIndex] = useState<number>();
    const router = useRouter();
    const { boardId } = router.query;
    const auth = useAuth();
    const boardsContext = useBoards();
    let username = auth.user?.name;

    if (username)
        username = username![0].toUpperCase() + username?.substring(1);

    useEffect(() => {
        const getBoards = async () => {
            try {
                const boards = await boardService.getBoards();
                boardsContext.setBoards(boards);
            } catch (err: any) {
                console.log(err);
            }
        }
        getBoards();
    }, []);


    useEffect(() => {
        const index = boardsContext.boards.findIndex(currentBoard => currentBoard._id === boardId);
        setActiveBoardIndex(index);
    }, [boardsContext.boards, boardId]);

    const createBoard = async () => {
        const newBoard = await boardService.create();
        const newBoards = [...boardsContext.boards, newBoard];
        boardsContext.setBoards(newBoards);
    }

    const onDragEnd = async ({ source, destination }: DropResult) => {
        const newBoards = [...boardsContext.boards];
        const [removed] = newBoards.splice(source.index, 1);

        if (!destination) return;

        newBoards.splice(destination.index, 0, removed);
        boardsContext.setBoards(newBoards);
        const index = boardsContext.boards.findIndex(currentBoard => currentBoard._id === boardId);
        setActiveBoardIndex(index);

        try {
            await boardService.updateBoardPosition({ boards: newBoards });
        } catch (err: any) {
            console.log(err);
        }

    }


    return (
        <nav className={`${className} bg-custom-black-light`}>
            <ListGroup className="w-100" as="ul">
                <ListGroup.Item
                    as='li'
                    className="border-0 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span className="fw-bold">{username}</span>
                    <BiLogOut
                        className='fs-5'
                        style={{ cursor: 'pointer' }}
                        onClick={() => auth.logout()}
                    />
                </ListGroup.Item>
                <ListGroup.Item
                    as='li'
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Favorites</span>
                </ListGroup.Item>
                <ListGroup.Item
                    as='li'
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Boards</span>
                    <AiFillFolderAdd
                        className="fs-5"
                        id="new-board-icon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => createBoard()}
                    />
                </ListGroup.Item>

                <ListGroup.Item
                    as="li"
                    className="border-0 mt-3 p-0 text-white bg-custom-black-light rounded-0"
                >

                    <BoardsList 
                        boards={boardsContext.boards}
                        onDragEnd={onDragEnd}
                        activeBoardIndex={activeBoardIndex}
                    />
                    
                </ListGroup.Item>
            </ListGroup>
        </nav>
    );
}

const StyledSidebar = styled(Sidebar)`
    min-width: 250px;
    height: 100vh;
    display: flex;

    #new-board-icon {
        transition: all 0.3s ease-in-out;
        &:hover {
            color:#4d4d52;
        }
    }
`;

export default StyledSidebar;