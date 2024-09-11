import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WorkerModule } from './worker.module';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      debug: true,
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer-2',
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
