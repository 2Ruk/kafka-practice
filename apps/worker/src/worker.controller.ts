import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Get()
  async getHello() {
    return this.workerService.getHello();
  }
  @MessagePattern(['hello', 'hello.test'])
  async handleMessage2(
    @Payload() message: { [key: string]: any },
    @Ctx() context: KafkaContext,
  ) {
    console.log(2);
    console.log(message);
    return 'Hello Kafka!';
  }
}
