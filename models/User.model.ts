import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    history: string[];
    assistantName?: string;
    assistantImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        history: {
            type: [String],
            default: [],
        },
        assistantName: {
            type: String,
        },
        assistantImage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model<IUser>("User", UserSchema);
export default User;
