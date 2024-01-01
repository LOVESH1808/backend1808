import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}
    
    //gets tasks after authentication
    @Get()
    @UseGuards(AuthGuard())
    async GetAllTasks():Promise<Task[]> {
        return await this.taskService.findAll();
    }

    //get task by id, removed after testing
    // @Get(':id')
    // async findById(@Param('id') id:string,):Promise<Task> {
    //     return this.taskService.findById(id);
    // }


    //create new tasks 
    @Post()
    @UseGuards(AuthGuard())
    async createTask(@Body() task:CreateTaskDto,@Req() req):Promise<Task> {
        // console.log(req.user);
        return this.taskService.create(task,req.user);
    }


    //update new task functinality . I couldn't apply this functionality in the front end because of time limit
    @Put(':id')
    async updateTask(@Param('id') id:string,@Body()task:UpdateTaskDto):Promise<Task> {
        return this.taskService.updateById(id,task);
    }

    //deletes task by id
    @Delete(':id')
    async deleteById(@Param('id') id:string,):Promise<Task> {
        return this.taskService.deleteById(id);
    }

    //gets tasks by id. I couldn't apply this functionality in the front end because of time limit
    @Get(':id')
    async findByUserId(@Param('id') id:string):Promise<Task[]> {
        return this.taskService.findAllById(id);
    }
}
