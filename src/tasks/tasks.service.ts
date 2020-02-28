import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    GetTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status) {
            tasks = tasks.filter( task => task.status === status);
        }

        if(search) {
            tasks = tasks.filter( task =>
            task.title.includes(search) ||
            task.description.includes(search),
            );
        }

        return tasks;
    }

    getTaskBtID(id: string): Task {
        const found = this.tasks.find(task => task.id === id);

        if (!found) {
            throw new NotFoundException('Task with ID "${id}" not found!');
        }

        return found;

    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const {title, description} = CreateTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task); 
        return task;
    }

    deleteTask(id: string): void {
        const found = this.getTaskBtID(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id); 
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskBtID(id);
        task.status = status;
        return task;
    }
}
