import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user-schema";
import mongoose from "mongoose";

//task schema

@Schema({
    timestamps:true,
})
export class Task {
    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    isDone:boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user : User
}

export const TaskSchema = SchemaFactory.createForClass(Task);