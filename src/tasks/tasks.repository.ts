import { Repository } from "typeorm";
import { Task } from "./entity/task.entity";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTasksFilterDto } from "./dto/query-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/entity/user.entity";
import { GetUser } from "src/auth/get-user.decorator";
import { Logger } from "@nestjs/common";

@Injectable()
export class TasksRepository {
  private logger = new Logger('TasksRepository', { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) { }

  async getTaskById(id: string, user: User): Promise<Task> {

    const task = await this.repository.findOne({ where: { id, user } })
    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {

    try {
      const { status, search } = filterDto;

      const query = this.repository.createQueryBuilder('task');
      query.where({ user });

      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere('(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE LOWER(:search))', {
          search: `%${search.toLowerCase()}%`
        })
      }

      const tasks = await query.getMany();

      return tasks;

    } catch (error) {

      this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error)
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {

    const { title, description } = createTaskDto;

    const task = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.repository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.repository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException('Task not found to delete!')
    }
  }

  async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {

    const task = await this.repository.findOne({ where: { id, user } });

    task.status = status;
    await this.repository.save(task);

    return task;
  }

}