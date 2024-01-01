import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

//login type
export class LogInDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    password: string;
}