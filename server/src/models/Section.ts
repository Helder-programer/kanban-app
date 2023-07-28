import mongoose from "mongoose";

import { ISectionDocument } from "./types/ISection";

const sectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: 'Untitled'
        },
        board: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Board',
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default mongoose.model<ISectionDocument>('Section', sectionSchema);
