import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user-schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    // signup new users
    async signup(signUpDto: SignUpDto):Promise<{token : string}> {
        const {name , email , password} = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        try
        {
            const user = await this.userModel.create({
                name,
                email,
                password : hashedPassword,
            })
    
            const token = this.jwtService.sign({id: user._id});
    
            return { token };
        }catch(err) {
            console.log(err);
        }
        
    }

    //log in 
    async login(logInDto: LogInDto):Promise<{token : string, userId : string}> {
        const {email, password} = logInDto;
        const user = await this.userModel.findOne({ email });

        if(!user) {
            throw new UnauthorizedException('Invalid email');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid Password');
        }
        const token = this.jwtService.sign({id: user._id});
        return {token, userId: user._id};

    }

    //get all users for testing purposes
    async getAll():Promise<User[]> {
        const user = await this.userModel.find();
        return user;
    }

    //deletes user for testing purposes
    async deleteById(id:string):Promise<User> {
        let res;
        try{
            res = await this.userModel.findByIdAndDelete(id);
        }catch(err)
        {
            throw new NotFoundException('task not found');
        }
        return res;
    }
}
