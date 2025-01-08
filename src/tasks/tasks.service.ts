import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
 import { Task } from './entity/task.entity';
import { GetTasksFilterDto } from './dto/query-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class TasksService {

  private logger = new Logger(`TasksService`, { timestamp: true });

  constructor(
    private readonly tasksRepository: TasksRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {

    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.getTaskById(id, user);

    if(!task) {
      throw new NotFoundException("Task not found!")
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

    return this.tasksRepository.createTask(createTaskDto, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    
    return this.tasksRepository.deleteTask(id, user);
  }

   updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {

    return this.tasksRepository.updateStatus(id, status, user);
  }
}
