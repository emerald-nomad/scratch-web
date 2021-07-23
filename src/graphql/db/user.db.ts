import { Schema, model, models, Model, Document } from 'mongoose';

export interface IUser extends Document {
    id: string
    name: string;
    username: string;
    password: string;
    role: 'USER' | 'DEVELOPER'
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['USER', 'DEVELOPER'],
        default: 'USER'
    },
});

export type IUserModel = Model<IUser>
export const User = models.User || model<IUser>('User', schema);