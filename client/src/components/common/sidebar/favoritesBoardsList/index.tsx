import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { DropResult } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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




function FavoritesBooardsList({ className }: IProps) {
    const router = useRouter();
    const boardsContext = useBoards();
    const [activeBoardIndex, setActiveBoardIndex] = useState(0);
    const { boardId } = router.query;


    useEffect(() => {
        const getFavoritesBoards = async () => {
            const favoritesBoards = await boardService.getFavorites();
            boardsContext.setFavoritesBoards(favoritesBoards);
        }
        getFavoritesBoards();
    }, []);

    useEffect(() => {
        const index = boardsContext.favoritesBoards.findIndex(board => board._id === boardId);
        setActiveBoardIndex(index);
    }, [boardsContext.favoritesBoards, boardId]);


    const onDragEnd = async ({ source, destination }: DropResult) => {
        const newFavoritesBoards = [...boardsContext.favoritesBoards];
        const [removed] = newFavoritesBoards.splice(source.index, 1);

        if (!destination) return;
        newFavoritesBoards.splice(destination.index, 0, removed);
        const index = newFavoritesBoards.findIndex(board => board._id === boardId);
        setActiveBoardIndex(index);
        boardsContext.setFavoritesBoards(newFavoritesBoards);

        try {
            await boardService.updateFavoritesBoardsPosition({ boards: newFavoritesBoards });
        } catch (err: any) {
            console.log(err);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="favorites-boards-list" key="favorites-boards-list">
                {
                    (provided) => (
                        <ListGroup
                            as='ul'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={className}
                        >

                            {boardsContext.favoritesBoards.map((board, index) =>
                                <Draggable key={board._id} draggableId={board._id} index={index}>
                                    {(provided, snapshot) => (
                                        <ListGroup.Item
                                            as="li"
                                            className={`${index === activeBoardIndex ? 'active' : 'bg-custom-black-light'} border-0 px-3 text-white rounded-0 d-flex justify-content-between align-items-center`}
                                            key={index}
                                            ref={provided.innerRef}
                                            style={{ cursor: snapshot.isDragging ? 'grab' : 'pointer !important' }}
                                            id="board"
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            onClick={() => router.push(`/boards/${board._id}`)}
                                        >
                                            <span>
                                                {board.icon} {board.title}
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

const StyledFavoritesBooardsList = styled(FavoritesBooardsList)`
    #board {
        font-size: 14px;
        width: 250px;
        
        &:hover {
            background-color: #6d6d6d !important;
        }

        >span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

`;

export default StyledFavoritesBooardsList;