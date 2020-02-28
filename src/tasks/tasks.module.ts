import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
