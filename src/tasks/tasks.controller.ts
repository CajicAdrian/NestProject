import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length) {
                
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskByID(@Param('id') id: string): Task {
        return this.tasksService.getTaskBtID(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param ('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    ): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
