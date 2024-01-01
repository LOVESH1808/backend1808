import { IsBoolean, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schemas/user-schema";


export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsString()
    description:string;

    @IsBoolean()
    isDone:boolean;

    @IsEmpty({ message: 'You cannot pass the userId'})
    user:User;
}