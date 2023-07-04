import mongoose from "mongoose";

import { ISectionDocument } from "./types/ISectionDocument";

const sectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: ''
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
