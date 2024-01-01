import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

//signup type
export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail({},{ message : 'Please enter correct email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}