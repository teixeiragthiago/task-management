import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  exports: [TasksRepository]
})
export class TasksModule {}
