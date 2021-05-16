import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document{
    email: string;
    pseudo: string;
    password_hash: string;
    roles: string[];
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    pseudo: { type: String },
    password_hash: { type: String, required: true },

    roles: [{ type: String }],
});

// Export the model and return your IUser interface
export const Users = mongoose.model<IUser>('User', UserSchema);