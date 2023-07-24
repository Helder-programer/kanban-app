import mongoose from "mongoose";

import { IBoardDocument } from "./types/IBoardDocument";

const boardSchema = new mongoose.Schema(
    {
        icon: {
            type: String,
            default: '📝'
        },
        title: {
            type: String,
            default: 'Untitled'
        },
        description: {
            type: String,
            default: `Add description here...`
        },
        position: {
            type: Number
        },
        favorite: {
            type: Boolean,
            default: false
        },
        favoritePosition: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBoardDocument>('Board', boardSchema);