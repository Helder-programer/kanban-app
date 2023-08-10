import { Button, Card } from "react-bootstrap";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DropResult } from "react-beautiful-dnd";

import { ISection } from "@/types/ISection";
import { sectionService } from "@/services/section";
import { taskService } from "@/services/task";
import { ITask } from "@/types/ITask";
import { useTheme } from "@/contexts/theme";
import TaskModal from "./taskModal";
import List from "./list";


interface IProps {
    sections: ISection[];
    setSections: Dispatch<SetStateAction<ISection[]>>;
    boardId: string;
    className?: string;
}

function Kanban({ sections, setSections, boardId }: IProps) {
    const [currentTask, setCurrentTask] = useState<ITask | undefined>(undefined);
    const { theme, setTheme } = useTheme();

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
        const sourceSectionIndex = newSections.findIndex(section => section.section_id === source.droppableId);
        const destinationSectionIndex = newSections.findIndex(section => section.section_id == destination.droppableId);

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
            await taskService.updateTasksPositions({
                boardId,
                sourceTasksList: sourceTasks,
                destinationTasksList: destinationTasks,
                sourceSectionId: source.droppableId,
                destinationSectionId: destination.droppableId
            })
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
        const index = newSections.findIndex(section => section.section_id === sectionId);
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
            const newSections = [...sections].filter(section => section.section_id !== sectionId);
            setSections(newSections);
        } catch (err: any) {
            console.log(err);
        }
    }


    const createTask = async (sectionId: string) => {
        try {
            const newTask = await taskService.create({ sectionId, boardId });
            const newSections = [...sections];
            const sectionIndex = newSections.findIndex(section => section.section_id === sectionId);
            newSections[sectionIndex].tasks = [...newSections[sectionIndex].tasks, newTask];

            setSections(newSections);
        } catch (err: any) {
            console.log(err);
        }
    }

    const deleteTask = async () => {
        if (!currentTask) return;

        const sectionIndex = sections.findIndex(section => section.section_id === currentTask.section_id);
        let newSections = [...sections];
        const taskIndex = newSections[sectionIndex].tasks.findIndex(task => task.task_id === currentTask?.task_id);
        newSections[sectionIndex].tasks.splice(taskIndex, 1);

        setCurrentTask(undefined);
        setSections(newSections);

        try {
            await taskService.deleteTask({
                boardId,
                taskId: currentTask.task_id,
                sectionId: currentTask.section_id
            });

            setCurrentTask(undefined);
        } catch (err: any) {
            console.log(err);
        }
    }

    useEffect(() => {

        if (!currentTask) return;

        const taskSectionId = currentTask.section_id;
        const sectionIndex = sections.findIndex(section => section.section_id === taskSectionId);
        const taskIndex = sections[sectionIndex].tasks.findIndex(task => task.task_id === currentTask.task_id);

        const newTaskData = { ...currentTask! };
        const newTasks = [...sections[sectionIndex].tasks];
        newTasks[taskIndex] = newTaskData;

        const newSections = [...sections];
        newSections[sectionIndex].tasks = newTasks;

        setSections(newSections);
    }, [currentTask]);


    return (
        <>
            <section className="d-flex w-100 mt-3 justify-content-between align-items-center">
                <Button
                    variant="none"

                    className={`${theme.name === 'dark-theme' ? 'btn-outline-custom-black-light' : 'btn-outline-custom-white-one'} text-primary`}
                    onClick={createSection}
                >
                    Add Section
                </Button>

                <span className='pe-4 text'>
                    {sections.length}  Sections
                </span>

            </section>
            <hr className="mt-1" />
            <List
                createTask={createTask}
                deleteSection={deleteSection}
                onDragEnd={onDragEnd}
                sections={sections}
                setCurrentTask={setCurrentTask}
                updateSection={updateSection}
            />

            <TaskModal
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                boardId={boardId}
                deleteTask={deleteTask}
            />
        </>
    );
}



export default Kanban;