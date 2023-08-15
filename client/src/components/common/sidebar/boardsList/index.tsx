import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { DropResult } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useBoards } from '@/contexts/boards';
import { boardService } from '@/services/board';

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

interface IProps {
    className?: string
}


function BoardsList({ className }: IProps) {
    const router = useRouter();
    const { boardId } = router.query;
    const [activeBoardIndex, setActiveBoardIndex] = useState(0);
    const boardsContext = useBoards();

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
        const index = boardsContext.boards.findIndex(currentBoard => currentBoard.board_id === boardId);
        setActiveBoardIndex(index);
    }, [boardsContext.boards, boardId]);

    const onDragEnd = async ({ source, destination }: DropResult) => {
        const newBoards = [...boardsContext.boards];
        const [removed] = newBoards.splice(source.index, 1);

        if (!destination) return;

        newBoards.splice(destination.index, 0, removed);
        const index = newBoards.findIndex(currentBoard => currentBoard.board_id === boardId);
        setActiveBoardIndex(index);
        boardsContext.setBoards(newBoards);


        try {
            await boardService.updateBoardsPositions({ boards: newBoards });
        } catch (err: any) {
            console.log(err);
        }

    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="boards-list" key="boards-list">
                {
                    (provided) => (
                        <ListGroup
                            as='ul'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={className}
                        >

                            {boardsContext.boards.map((board, index) =>
                                <Draggable key={board.board_id} draggableId={board.board_id} index={index}>
                                    {(provided, snapshot) => (
                                        <ListGroup.Item
                                            as="li"
                                            className={`${index === activeBoardIndex ? 'active' : 'bg-transparent'} text border-0 px-3 rounded-0 d-flex justify-content-between align-items-center board`}
                                            key={index}
                                            ref={provided.innerRef}
                                            style={{ cursor: snapshot.isDragging ? 'grab' : 'pointer !important' }}                                            
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            onClick={() => router.push(`/boards/${board.board_id}`)}
                                        >
                                            <span>
                                                {board.icon} {board.title ? board.title : 'Untitled'}
                                            </span>
                                        </ListGroup.Item>
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </ListGroup>
                    )
                }
            </Droppable>
        </DragDropContext>
    );
}

const StyledBoardsList = styled(BoardsList)`
    .board {
        font-size: 14px;
        width: 250px;   
        &:hover {
            background-color: #a09e9e !important;
        }

        >span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

`;

export default StyledBoardsList;