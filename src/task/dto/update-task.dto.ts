import { IsBoolean, IsEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user-schema";


export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsBoolean()
    isDone:boolean;

    
    @IsEmpty({ message: 'You cannot pass the userId'})
    user:User;
}