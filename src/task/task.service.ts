import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schema/task.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user-schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>,
    ) {}
    //gets all tasks
    async findAll():Promise<Task[]> {
        const tasks = await this.taskModel.find();
        return tasks;
    }

    //gets all tasks related to a particular user
    async findAllById(id: string):Promise<Task[]> {
        const tasks = await this.taskModel.find({ user:id});
        return tasks;
    }

    //creates new task
    async create(task:Task,user: User):Promise<Task> {
        const data = Object.assign(task, { user : user._id});
        let res;
        try{
            res = await this.taskModel.create(data);
        }catch(err)
        {
            console.log(err);
        }
        return res;
    }


    //find by task id.  I couldn't apply this functionality in the front end because of time limit
    async findById(id:string):Promise<Task> {
        let res;
        try{
            res = await this.taskModel.findById(id);
        }catch(err)
        {
            throw new NotFoundException('task not found');
        }
        return res;
    }

    //update by taskId.  I couldn't apply this functionality in the front end because of time limit
    async updateById(id:string,task:Task):Promise<Task> {
        let res;
        try{
            res = await this.taskModel.findByIdAndUpdate(id,task, {
                new:true,
                runValidators:true,
            });
        }catch(err)
        {
            throw new NotFoundException('task not found');
        }
        return res;
    }

    //deletes task by id
    async deleteById(id:string):Promise<Task> {
        let res;
        try{
            res = await this.taskModel.findByIdAndDelete(id);
        }catch(err)
        {
            throw new NotFoundException('task not found');
        }
        return res;
    }
}
