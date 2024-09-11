import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  //
  // app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   options: {
  //     debug: true,
  //     client: {
  //       brokers: ['localhost:9092'],
  //     },
  //     consumer: {
  //       groupId: 'my-kafka-consumer',
  //     },
  //     producer: {
  //       allowAutoTopicCreation: true,
  //       createPartitioner: Partitioners.LegacyPartitioner,
  //     },
  //   },
  // });
  //
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-kafka-consumer-1',
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  });
  await app.listen();
}
bootstrap();
