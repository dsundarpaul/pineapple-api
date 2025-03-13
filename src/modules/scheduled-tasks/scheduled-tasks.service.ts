import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Interval(50000)
  handleTimeout() {
    this.logger.debug('Priting interval task 😁😁😁')
  }
}




