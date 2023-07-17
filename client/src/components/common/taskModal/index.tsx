import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import styled from 'styled-components';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

import { ITask } from "@/types/ITask";

interface IProps {
    currentTask: ITask | undefined;
    setCurrentTask: Dispatch<SetStateAction<ITask | undefined>>;
    boardId: string;
    className?: string;
}

const ReactQuill = dynamic(() => {
    return import('react-quill');
}, { ssr: false });

function TaskModal({ currentTask, setCurrentTask, boardId, className }: IProps) {

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
                <div className="task-title">
                    <input type="text"
                        className="w-100 mb-3 bg-transparent border-0 fs-4 text-custom-white p-0 outline-none fw-bold"
                        placeholder="Untitled"
                        style={{ outline: 'none' }}
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
                        value={''}
                        theme="snow"
                        placeholder="Add task content here..."
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

    .ql-toolbar, .ql-container {
        border: none !important;

        span, svg {
            color: white !important;
        }
    }

    .ql-container > .ql-editor:before {
        color: white;
        opacity: 0.3;
    }

`;



export default StyledModal;