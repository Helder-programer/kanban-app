import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { DropResult } from 'react-beautiful-dnd';

import { IBoard } from '@/types/IBoard';
import { useRouter } from 'next/router';

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
    boards: IBoard[];
    activeBoardIndex: number | undefined;
    onDragEnd: (result: DropResult) => Promise<void>;
    className?: string

}


function BoardsList({ boards, activeBoardIndex, onDragEnd, className }: IProps) {
    const router = useRouter();

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

                            {boards.map((board, index) =>
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

const StyledBoardsList = styled(BoardsList)`
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

export default StyledBoardsList;