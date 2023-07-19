import { Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import styled from 'styled-components';
import dynamic from "next/dynamic";
import { Delta as TypeDelta, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

import { ITask } from "@/types/ITask";
import { taskService } from "@/services/task";

interface IProps {
    currentTask: ITask | undefined;
    setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
    boardId: string;
    className?: string;
}

const ReactQuill = dynamic(() => {
    return import('react-quill');
}, { ssr: false });

let timer: any = undefined;
const timeout = 600;

function TaskModal({ currentTask, setCurrentTask, boardId, className }: IProps) {
    const [taskTitle, setTaskTitle] = useState<string | undefined>('');
    const [taskContent, setTaskContent] = useState<string | undefined>('');

    const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer);

        const newTitle = event.target.value;
        setTaskTitle(newTitle);

        if (currentTask)
            setCurrentTask({ ...currentTask, title: newTitle });
        else return;

        timer = setTimeout(async () => {
            try {
                await taskService.update({ boardId, taskId: currentTask._id, title: newTitle });
            } catch (err: any) {
                console.log(err);
            }
        }, timeout);
    }

    const updateDescription = (content: string, delta: TypeDelta, source: Sources) => {
        clearInterval(timer);

        if (source === 'user') {
            
            if (!currentTask) return;
            
            setCurrentTask({ ...currentTask, content });
            setTaskContent(content);


            timer = setInterval(async () => {
                try {
                    await taskService.update({ boardId, content: taskContent, taskId: currentTask._id });
                } catch (err: any) {
                    console.log(err);
                }
            }, timeout);
        }


    }

    useEffect(() => {
        setTaskTitle(currentTask?.title);
        setTaskContent(currentTask?.content);
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
                    <input type="text"
                        className="w-100 mb-3 bg-transparent border-0 fs-4 text-custom-white p-0 outline-none fw-bold"
                        placeholder="Untitled"
                        style={{ outline: 'none' }}
                        value={taskTitle}
                        onChange={updateTitle}
                    />
                    <span className="ps-1 text-custom-white small-text">{currentTask ? moment(currentTask.createdAt).format('DD/MM/YYYY') : ''}</span>
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
        border: none;

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