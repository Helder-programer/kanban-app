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
                await taskService.update({ boardId, taskId: currentTask._id, title: newTitle });
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
                    await taskService.update({ boardId, content, taskId: currentTask._id });
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
                await taskService.update({ taskId: currentTask._id, boardId, color });
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);
    }

    useEffect(() => {
        setTaskTitle(currentTask?.title);
        setTaskContent(currentTask?.content);
        setTaskColor(currentTask?.color);
    }, [currentTask?._id]);

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
                    <div className="d-flex align-items-center mb-3">
                        <input type="text"
                            className="w-100 bg-transparent border-0 fs-4 text-custom-white p-0 outline-none fw-bold"
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
                        <span className="text-custom-white small-text">{currentTask ? moment(currentTask.createdAt).format('DD/MM/YYYY') : ''}</span>
                        <span className="text-white small-text d-block">
                            Color:
                            <input
                                type="color"
                                value={taskColor}
                                onChange={updateColor}
                            />
                        </span>
                    </div>
                </div>
            </Modal.Header>
            <hr className="m-0 text-custom-white" />
            <Modal.Body className="rounded-bottom">
                <div id="task-content-editor">
                    <ReactQuill
                        className="bg-custom-light"
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
    .modal-content {
        padding: 2rem;
        background-color: #333;
    }

    #task-content-editor {
        height: 40vh;
        overflow-y: auto;
    }

    .ql-container {
        border: none;
        color: #fff;

        >.ql-editor::before {
            color: #fff;
            opacity: 0.3;
        }
    }


    .ql-toolbar {
        border: dashed 1px;

        .ql-stroke {
            fill: none;
            stroke: #fff;
        }

        .ql-fill {
            fill: #fff;
            stroke: none;
        }

        .ql-picker-item .ql-stroke {
            fill: #000;
            stroke: #000;
        }
        
        .ql-picker-label {
            color: #fff;
        }
    }
`;



export default StyledModal;