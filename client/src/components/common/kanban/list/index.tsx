import { ISection } from "@/types/ISection";
import { ITask } from "@/types/ITask";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
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
        <DragDropContext onDragEnd={onDragEnd}>
            <section id="kanban" className={className}>
                {
                    sections.map(section => (
                        <Droppable key={section._id} droppableId={section._id}>
                            {(provided) => (
                                <div
                                    key={section._id}
                                    className="section p-3 bg-custom-black border border-custom-black-light shadow rounded mb-3"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="d-flex w-100 justify-content-between align-items-center mb-3">
                                        <input
                                            type="text"
                                            className="outline-0 bg-transparent w-100 border-0 text-custom-white"
                                            value={section.title}
                                            placeholder="Untitled"
                                            onChange={event => updateSection(event, section._id)}
                                        />
                                        <i
                                            className="fs-5 mx-2 text-custom-white"
                                            style={{ cursor: 'pointer' }}
                                            onClick={event => createTask(section._id)}
                                        >

                                            <BsPlusLg id="add-task-icon" />
                                        </i>
                                        <i
                                            className="fs-6 text-custom-white"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => deleteSection(section._id)}
                                        >
                                            <FaTrash id="delete-task-icon" />
                                        </i>
                                    </div>

                                    {section.tasks.map((task, index) =>
                                        <Draggable draggableId={task._id} key={task._id} index={index}>
                                            {(provided, snapshot) => (
                                                <Card
                                                    className="bg-custom-black-light text-custom-white p-2 mb-2 task"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => setCurrentTask(task)}
                                                >
                                                    {task.title ? task.title : 'Untitled'}
                                                </Card>
                                            )}
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </section>
        </DragDropContext >
    );
}

const StyledList = styled(List)`
    max-width: calc(100vw - 360px);
    overflow: auto;
    display: flex;
    align-items: flex-start;
    gap: 2rem;

    .section {
        width: 250px;
        min-width: 250px;
        overflow: auto;
        max-height: calc(100vh - 300px);
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