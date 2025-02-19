import { Module } from "@nestjs/common";
import { TasksService } from "./scheduled-tasks.service";

@Module({
  providers: [TasksService]
})
export class TaskModule {}