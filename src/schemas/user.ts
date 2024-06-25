import { Schema, model } from 'mongoose';

interface User {
    name: string,
    time: number,
    correct: number
    minutes: string
    seconds: string
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    correct: { type: Number, required: true },
    minutes: { type: String },
    seconds: { type: String }

});

const UserModel = model<User>('User', userSchema);

export default UserModel;
