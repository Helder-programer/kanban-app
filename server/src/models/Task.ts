import mongoose from "mongoose";
import { ITaskDocument } from "./types/ITaskDocument";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: '#333333'
        },
        position: {
            type: Number
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITaskDocument>('Task', taskSchema);