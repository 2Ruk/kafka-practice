import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import KafkaConfig from './config/kafka.config';
import { KafkaInterceptor } from '@app/library/interceptor/kafka.interceptor';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(WorkerModule, KafkaConfig());
  app.useGlobalInterceptors(new KafkaInterceptor());
  app.listen();
}
bootstrap();
