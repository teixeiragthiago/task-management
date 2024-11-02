import { Repository } from "typeorm";
import { Task } from "./entity/task.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTasksFilterDto } from "./dto/query-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";

@Injectable()
export class TasksRepository {
    constructor(
        @InjectRepository(Task)
        private readonly repository: Repository<Task>, 
    ){}

    async getTaskById(id: string): Promise<Task> {
        return await this.repository.findOneBy({id});
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {

        const { status, search } = filterDto;
    
        const query = this.repository.createQueryBuilder('task');
    
        if(status) {
          query.andWhere('task.status = :status', { status });
        }
    
        if(search) {
          query.andWhere('LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search)', {
            search: `%${search.toLowerCase()}%`
          })
        }
    
        const tasks = await query.getMany();
        
        console.log('passou aqui');
    
        return tasks;
      }

      async createTask(createTaskDto: CreateTaskDto): Promise<Task> {

        const { title, description } = createTaskDto;
    
        const task = this.repository.create({
          title,
          description,
          status: TaskStatus.OPEN
        });
    
        await this.repository.save(task);
    
        return task;
      }

      async deleteTask(id: string): Promise<void> {
        const result = await this.repository.delete(id);
    
        if(result.affected === 0) {
          throw new NotFoundException('Task not found to delete!')
        }
      }

      async updateStatus(id: string, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        
        task.status = status;
        await this.repository.save(task);
    
        return task;
      }

}