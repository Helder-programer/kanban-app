import { Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import styled from 'styled-components';
import dynamic from "next/dynamic";
import { Delta as TypeDelta, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

import { ITask } from "@/types/ITask";
import { taskService } from "@/services/task";
import { FaTrash } from "react-icons/fa";

const ReactQuill = dynamic(() => {
    return import('react-quill');
}, { ssr: false });

interface IProps {
    currentTask: ITask | undefined;
    setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
    boardId: string;
    className?: string;
    deleteTask(): Promise<void>;
}


let timer: any = undefined;
const timeout = 1000;

function TaskModal({ currentTask, setCurrentTask, boardId, className, deleteTask }: IProps) {
    const [taskTitle, setTaskTitle] = useState<string | undefined>('');
    const [taskContent, setTaskContent] = useState<string | undefined>('');
    const [taskColor, setTaskColor] = useState<string | undefined>('');

    const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);

        const newTitle = event.target.value;
        setTaskTitle(newTitle);

        if (!currentTask) return;

        setCurrentTask({ ...currentTask, title: newTitle });

        timer = setTimeout(async () => {
            try {
                await taskService.update({ boardId, taskId: currentTask.task_id, title: newTitle, sectionId: currentTask.section_id });
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);
    }

    const updateDescription = (content: string, delta: TypeDelta, source: Sources) => {
        clearTimeout(timer);

        if (!currentTask) return;

        if (source === 'user') {

            setCurrentTask({ ...currentTask, content });
            setTaskContent(content);

            timer = setTimeout(async () => {
                try {
                    await taskService.update({
                        boardId,
                        content,
                        taskId: currentTask.task_id,
                        sectionId: currentTask.section_id
                    });
                } catch (err: any) {
                    console.log(err);
                }
            }, timeout);
        }
    }

    const updateColor = async (event: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);
        if (!currentTask) return;

        const color = event.target.value;
        setTaskColor(color);
        setCurrentTask({ ...currentTask, color });

        timer = setTimeout(async () => {
            try {
                await taskService.update({
                    taskId: currentTask.task_id,
                    boardId, color,
                    sectionId: currentTask.section_id
                });
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);
    }

    useEffect(() => {
        setTaskTitle(currentTask?.title);
        setTaskContent(currentTask?.content);
        setTaskColor(currentTask?.color);
    }, [currentTask?.task_id]);

    const handleClose = () => {
        setCurrentTask(undefined);
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }


    return (
        <Modal
            show={currentTask !== undefined}
            onHide={handleClose}
            centered
            size="lg"
            className={className}
        >

            <Modal.Header className="border-0">
                <div className="w-100">
                    <div className="d-flex gap-3 align-items-center mb-2">
                        <input 
                            type="text"
                            className="w-100 text bg-transparent border-0 fs-4 p-0 outline-none fw-bold"
                            placeholder="Untitled"
                            style={{ outline: 'none' }}
                            value={taskTitle}
                            onChange={updateTitle}
                        />
                        <i
                            style={{ cursor: 'pointer' }}
                            title="Delete this task"
                            onClick={() => deleteTask()}
                        >
                            <FaTrash className="fs-5 text-custom-red" />
                        </i>
                    </div>
                    <div className="ps-1">
                        <span className="text small-text">{currentTask ? moment(currentTask.created_at).format('DD/MM/YYYY') : ''}</span>
                        <span className="text small-text d-flex align-items-center gap-2">
                            Color:
                            <div id="color-picker">
                                <input
                                    type="color"
                                    value={taskColor}
                                    onChange={updateColor}
                                />
                            </div>
                        </span>
                    </div>
                </div>
            </Modal.Header>
            <hr className="m-0 text" />
            <Modal.Body className="rounded-bottom">
                <div id="task-content-editor">
                    <ReactQuill
                        modules={modules}
                        onChange={updateDescription}
                        value={taskContent}
                        placeholder="Add task content here..."
                        theme="snow"
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

const StyledModal = styled(TaskModal)`

    #color-picker {
        overflow: hidden;
        border-radius: 50%;
        width: 20px;
        height: 20px;   
        border: 1px solid black;
        
        input {
            cursor: pointer;
            position: relative;
            left: -2px;
            top: -2px;
            padding: 0;
            border: 0;
            margin: 0;
        }
    }

    .modal-content {
        padding: 2rem;
        background-color: ${({ theme }) => theme.colors.task};
    }
    
    
    #task-content-editor {
        height: 40vh;
        overflow-y: auto;
    }
    
    .ql-container {
        border: none;
        
        >.ql-editor {
            padding-right: 0;
            padding-left: 0;
            color: ${({ theme }) => theme.colors.text};
        }

        >.ql-editor::before {
            color: ${({ theme }) => theme.colors.text};
            opacity: 0.3;
        }
    }


    .ql-toolbar {
        border: dashed 1px;

        .ql-stroke {
            fill: none;
            stroke: ${({ theme }) => theme.colors.text};
        }

        .ql-fill {
            fill: ${({ theme }) => theme.colors.text};
            stroke: none;
        }

        .ql-picker-item .ql-stroke {
            fill: #000;
            stroke: #000;
        }
        
        .ql-picker-label {
            color: ${({ theme }) => theme.colors.text};
        }
    }
`;



export default StyledModal;