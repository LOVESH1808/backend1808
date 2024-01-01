import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[AuthModule,
        MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema}])],
    controllers:[TaskController],
    providers:[TaskService]
})
export class TaskModule {}
