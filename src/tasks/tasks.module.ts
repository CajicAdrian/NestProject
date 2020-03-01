import { AuthModule } from './../auth/auth.module';
import { TasksService } from './tasks.service';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],

  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
