import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
// user schema

@Schema({
    timestamps:true
})
export class User extends Document {
    @Prop()
    name:string;

    @Prop({ unique : [true, 'Duplicate email entered'], sparse:[true] })
    email:string;

    @Prop()
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);