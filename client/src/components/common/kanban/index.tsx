import { Button, Card } from "react-bootstrap";
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { BsPlusLg } from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

import { ISection } from "@/types/ISection";
import { sectionService } from "@/services/section";
import { taskService } from "@/services/task";
import { ITask } from "@/types/ITask";
import TaskModal from "../taskModal";


interface IProps {
    sections: ISection[];
    setSections: Dispatch<SetStateAction<ISection[]>>;
    boardId: string;
    className?: string;
}

function Kanban({ sections, setSections, boardId, className }: IProps) {
    const [currentTask, setCurrentTask] = useState<ITask | undefined>(undefined);

    const createSection = async () => {
        try {
            const newSection = await sectionService.create({ boardId });
            setSections([...sections, newSection]);
        } catch (err: any) {
            console.log(err);
        }
    }

    const onDragEnd = async ({ source, destination }: DropResult) => {
        if (!destination) return;
        const newSections = [...sections];
        const sourceSectionIndex = newSections.findIndex(section => section._id === source.droppableId);
        const destinationSectionIndex = newSections.findIndex(section => section._id == destination.droppableId);
        const sourceTasks = [...newSections[sourceSectionIndex].tasks];
        const destinationTasks = [...newSections[destinationSectionIndex].tasks];

        if (source.droppableId === destination.droppableId) {
            const [removedTask] = destinationTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removedTask);
            newSections[destinationSectionIndex].tasks = destinationTasks;
        } else {
            const [removedTask] = sourceTasks.splice(source.index, 1);
            destinationTasks.splice(destination.index, 0, removedTask);
            newSections[destinationSectionIndex].tasks = destinationTasks;
            newSections[sourceSectionIndex].tasks = sourceTasks;
        }

        try {
            // await taskApi.updatePosition(boardId, {
            //     resourceList: sourceTasks,
            //     destinationList: destinationTasks,
            //     resourceSectionId: sourceSectionId,
            //     destinationSectionId: destinationSectionId
            // })
            setSections(newSections);
        } catch (err) {
            alert(err)
        }
    }


    const updateSection = async (event: ChangeEvent<HTMLInputElement>, sectionId: string) => {
        let timer;
        const timeout = 600;
        clearTimeout(timer);
        const title = event.target.value;

        const newSections = [...sections];
        const index = newSections.findIndex(section => section._id === sectionId);
        newSections[index].title = title;
        setSections(newSections);


        timer = setTimeout(async () => {
            try {
                await sectionService.update({ boardId, sectionId, title });
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);

    }

    const deleteSection = async (sectionId: string) => {
        try {
            await sectionService.deleteSection({ sectionId, boardId });
            const newSections = [...sections].filter(section => section._id !== sectionId);
            setSections(newSections);
        } catch (err: any) {
            console.log(err);
        }
    }


    const createTask = async (sectionId: string) => {
        try {
            const newTask = await taskService.create({ sectionId, boardId });
            const newSections = [...sections];
            const sectionIndex = newSections.findIndex(section => section._id === sectionId);
            newSections[sectionIndex].tasks = [...newSections[sectionIndex].tasks, newTask];

            setSections(newSections);
        } catch (err: any) {
            console.log(err);
        }
    }


    return (
        <>
            <section className="d-flex w-100 mt-3 justify-content-between align-items-center">
                <Button
                    variant="none"
                    className="btn-outline-custom-black-light text-primary border-0"
                    onClick={createSection}
                >
                    Add Section
                </Button>

                <span className="text-custom-white pe-4">
                    {sections.length}  Sections
                </span>

            </section>
            <hr className="text-white mt-1" />

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
                    <TaskModal
                        currentTask={currentTask}
                        setCurrentTask={setCurrentTask}
                        boardId={boardId}
                    />
                </section>
            </DragDropContext >
        </>
    );
}


const StyledKanban = styled(Kanban)`
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

export default StyledKanban;