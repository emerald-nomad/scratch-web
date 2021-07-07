import { Schema, model, models, Model, Document } from 'mongoose';

interface IUser extends Document {
    id: string
    name: string;
    email: string;
    role: 'USER' | 'DEVELOPER'
}

const schema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ['USER', 'DEVELOPER'],
        default: 'USER'
    },
});

export type IUserModel = Model<IUser>
export const User = models.User || model<IUser>('User', schema);