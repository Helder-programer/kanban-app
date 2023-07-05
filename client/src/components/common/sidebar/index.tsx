import styled from 'styled-components';
import { ListGroup } from "react-bootstrap";
import { BiLogOut } from 'react-icons/bi';
import { AiFillFolderAdd } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DragDropContext = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.DragDropContext;
        }),
    { ssr: false },
);
const Droppable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Droppable;
        }),
    { ssr: false },
);
const Draggable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Draggable;
        }),
    { ssr: false },
);

import { useAuth } from "@/contexts/auth";
import { boardService } from '@/services/board';
import { useBoards } from '@/contexts/boards';


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

    const onDragEnd = async () => {

    }


    return (
        <nav className={`${className} bg-custom-black-light`}>
            <ListGroup className="w-100" as="ul">
                <ListGroup.Item
                    className="border-0 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
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
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
                    action
                    style={{ cursor: 'default' }}
                >
                    <span>Favorites</span>
                </ListGroup.Item>
                <ListGroup.Item
                    className="border-0 mt-3 px-3 text-white bg-custom-black-light rounded-0 d-flex justify-content-between align-items-center w-100"
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

                <DragDropContext onDragEnd={() => { }}>
                    <Droppable droppableId="boards-list" key="boards-list">
                        {
                            (provided) => (
                                <ListGroup as='ul' {...provided.droppableProps} ref={provided.innerRef}>
                                    {provided.placeholder}

                                    {boardsContext.boards.map((board, index) =>
                                        <Draggable key={board._id} draggableId={board._id} index={index}>
                                            {(provided, snapshot) => (
                                                <ListGroup.Item
                                                    className={`${index === activeBoardIndex ? 'active' : 'bg-custom-black-light'} border-0 px-3 text-white rounded-0 d-flex justify-content-between align-items-center w-auto`}
                                                    key={index}
                                                    ref={provided.innerRef}
                                                    style={{ cursor: snapshot.isDragging ? 'grab' : 'pointer !important' }}
                                                    id="board-id"
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    onClick={() => router.push(`/boards/${board._id}`)}
                                                >

                                                    <span>{board.icon} {board.title}</span>
                                                </ListGroup.Item>
                                            )}
                                        </Draggable>
                                    )}
                                </ListGroup>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </ListGroup>
        </nav>
    );
}

const StyledSidebar = styled(Sidebar)`
    width: 250px;
    height: 100vh;
    display: flex;

    #new-board-icon {
        transition: all 0.3s ease-in-out;
        &:hover {
            color:#4d4d52;
        }
    }

    #board-id {
        width: 100%;
        text-overflow: ellipsis;
        font-size: 14px;
        &:hover {
            background-color: #6d6d6d !important;
        }
    }
`;

export default StyledSidebar;