import { Schema, model } from 'mongoose';

interface User {
    name: string,
    time: number,
    correct: number
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    time: { type: Number, required: true },
    correct: { type: Number, required: true }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
