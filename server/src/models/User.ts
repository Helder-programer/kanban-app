import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { IUserDocument } from "./types/IUser";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        return next();
    }
});

userSchema.methods.isCorrectPassword = async function isCorrectPassword (this: IUserDocument, password: string) {
    const isEqualPassword = await bcrypt.compare(password, this.password);
    return isEqualPassword;
}


export default mongoose.model<IUserDocument>('User', userSchema);