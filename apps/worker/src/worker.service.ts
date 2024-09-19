import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class WorkerService {
  constructor(
    @Inject('PRODUCER') private readonly producerClient: ClientKafka,
  ) {}
  async getHello(): Promise<string> {
    this.producerClient.emit('EXCEL', { value: 'Hello Kafka!' });
    this.producerClient.emit('hello', { value: 'Hello Kafka!' });
    return 'Hello World!';
  }
}
