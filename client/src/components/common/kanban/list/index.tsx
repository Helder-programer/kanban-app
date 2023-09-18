import { ISection } from "@/types/ISection";
import { ITask } from "@/types/ITask";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import styled from 'styled-components';


interface IProps {
    className?: string;
    sections: ISection[];
    updateSection(event: ChangeEvent<HTMLInputElement>, sectionId: string): Promise<void>;
    createTask(sectionId: string): Promise<void>;
    deleteSection(sectionId: string): Promise<void>;
    onDragEnd({ source, destination }: DropResult): Promise<void>;
    setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
}

function List({
    className,
    sections,
    createTask,
    deleteSection,
    updateSection,
    onDragEnd,
    setCurrentTask }: IProps) {

    return (
        <section id="kanban" className={className}>
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    sections.map(section => (
                        <Droppable key={section.section_id} droppableId={section.section_id} direction="vertical">
                            {(provided) => (
                                <div
                                    key={section.section_id}
                                    className="section p-3 shadow-sm mb-3 rounded-4"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="d-flex w-100 justify-content-between align-items-center mb-3">
                                        <input
                                            type="text"
                                            className="outline-0 bg-transparent w-100 fw-bold border-0 text"
                                            value={section.title}
                                            placeholder="Untitled"
                                            maxLength={30}
                                            onChange={event => updateSection(event, section.section_id)}
                                        />
                                        <i
                                            className="fs-5 mx-2 text"
                                            style={{ cursor: 'pointer' }}
                                            onClick={event => createTask(section.section_id)}
                                        >

                                            <BsPlusLg id="add-task-icon" />
                                        </i>
                                        <i
                                            className="fs-6 text"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => deleteSection(section.section_id)}
                                        >
                                            <FaTrash id="delete-task-icon" />
                                        </i>
                                    </div>

        
                                    {section.tasks.map((task, index) =>
                                        <Draggable draggableId={task.task_id} key={task.task_id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <div
                                                        className={`task rounded shadow mt-3 text ${snapshot.isDragging ? 'task-dragging' : ''}`}
                                                        onClick={() => setCurrentTask(task)}
                                                    >
                                                        <div
                                                            style={{
                                                                backgroundColor: `${task.color}`,
                                                                width: '100%',
                                                                height: '30px'
                                                            }}
                                                            className="rounded-top w-100"
                                                        ></div>
                                                        <div className="p-3">
                                                            <span className="d-block fw-semibold">{task.title ? task.title : 'Untitled'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                            
                        </Droppable>
                    ))
                }
            </DragDropContext >
        </section>
    );
}

const StyledList = styled(List)`
    width: 100%;
    display: flex;
    overflow: auto;
    align-items: flex-start;
    height: calc(100vh - 250px);
    gap: 2rem;

    .section {
        width: 300px;
        min-width: 300px;
        background-color: ${({ theme }) => theme.colors.section};
    }

    .task {
        background-color: ${({ theme }) => theme.colors.task};
        word-break: break-all;
    }

    .task-dragging {
        transform: rotate(5deg);
        opacity: 0.8;
        transition: all 0.1s ease-in-out; 
    }

    #add-task-icon:hover {
        color: #008000;
    }

    #delete-task-icon:hover {
        color: #a30101;
    }

    input[type=text] {
        outline: none;
    }
`;


export default StyledList;