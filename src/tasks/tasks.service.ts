import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
 import { Task } from './entity/task.entity';
import { GetTasksFilterDto } from './dto/query-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {

  constructor(
    private readonly tasksRepository: TasksRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {

    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id);

    if(!task) {
      throw new NotFoundException("Task not found!")
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {

    return this.tasksRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    
    return this.tasksRepository.deleteTask(id);
  }

   updateStatus(id: string, status: TaskStatus): Promise<Task> {

    return this.tasksRepository.updateStatus(id, status);
  }
}
