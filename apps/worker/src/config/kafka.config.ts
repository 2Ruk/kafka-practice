import { Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import * as process from 'process';

export default () => {
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: String(process.env.KAFKA_BROKER).split(','),
      },
      consumer: {
        groupId: 'kafka-worker',
      },
      producer: {
        allowAutoTopicCreation: true,
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  };
};
