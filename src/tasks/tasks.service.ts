import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/query-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // getAllTasks() {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if(status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if(search) {
  //     tasks = tasks.filter((task) =>{
  //       if(task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     })
  //   }

  //   return tasks;
  // }

  // getTaskById(id: string): Task {

  //   const task = this.tasks.find((task) => task.id == id);
  //   if(!task) {
  //     throw new NotFoundException(`Task not found!`);
  //   }

  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({id});

    if(!task) {
      throw new NotFoundException()
    }

    return task;
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  // deleteTask(id: string): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateStatus(id: string, status: TaskStatus): Task {
  //   const taskIndex = this.tasks.findIndex((task) => task.id == id);

  //   const task = this.tasks[taskIndex];
  //   if(!task) {
  //     throw new NotFoundException(`Task not found to update status!`);
  //   }

  //   task.status = status;

  //   return task;
  // }
}
