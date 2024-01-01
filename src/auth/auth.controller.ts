import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { User } from './schemas/user-schema';

//controller for user related actions.

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //for signing up users and returning a access token
    @Post('/signup')
    @HttpCode(HttpStatus.OK)
    signUp(@Body() signUpDto: SignUpDto):Promise<{ token: string} > {
        return this.authService.signup(signUpDto);
    }

    //for logging and getting a token and the userid
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    logIn(@Body() logInDto: LogInDto):Promise<{ token : string, userId : string }> {
        return this.authService.login(logInDto);
    }

    //for getting all users without authorization for testing purposes
    @Get('/getAll')
    getAll():Promise<User[]> {
        return this.authService.getAll();
    }
    
    //delete user by userid for testing purposes
    @Delete(':id')
    async deleteById(@Param('id') id:string,):Promise<User> {
        return this.authService.deleteById(id);
    }
}
