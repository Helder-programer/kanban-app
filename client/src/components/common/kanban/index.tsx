import { Button } from "react-bootstrap";
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { BsPlusLg } from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

import { ISection } from "@/types/ISection";
import { sectionService } from "@/services/section";


interface IProps {
    sections: ISection[];
    setSections: Dispatch<SetStateAction<ISection[]>>;
    boardId: string;
    className?: string;
}

function Kanban({ sections, setSections, boardId, className }: IProps) {


    const createSection = async () => {
        try {
            const newSection = await sectionService.create({ boardId });
            setSections([...sections, newSection]);
        } catch (err: any) {
            console.log(err);
        }
    }

    const onDragEnd = async ({ source, destination }: DropResult) => {

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
                <section id="kanban" className={`${className}`}>
                    {
                        sections.map(section => (
                            <div key={section._id} style={{ width: '300px' }}>
                                <Droppable key={section._id} droppableId={section._id}>
                                    {(provided) => (
                                        <div
                                            className="w-100 p-3 bg-custom-black-light shadow rounded"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className="d-flex w-100 justify-content-between align-items-center mb-3">
                                                <input type="text"
                                                    className="outline-none bg-transparent border-0 text-custom-white"
                                                    value={section.title}
                                                    placeholder="Untitled"
                                                    style={{ flexGrow: 1 }}
                                                    onChange={event => updateSection(event, section._id)}
                                                />
                                                <i
                                                    className="fs-5 mx-2 text-custom-white"
                                                    style={{ cursor: 'pointer' }}
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
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }

                </section>
            </DragDropContext>
        </>
    );
}


const StyledKanban = styled(Kanban)`
    max-width: calc(100vw - 360px);
    overflow: auto;
    display: flex;
    gap: 2rem;


    #add-task-icon:hover {
        color: #008000;
    }

    #delete-task-icon:hover {
        color: #a30101;
    }

`;

export default StyledKanban;