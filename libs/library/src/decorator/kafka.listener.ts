import { MessagePattern } from '@nestjs/microservices';
import { KafkaTopic } from '@app/library/enum/kafka.topic.enum';

/**
 * KafkaListener는 {@link KafkaTopic} 을 내부적으로 Wrapping하고 있습니다.
 * Topic에 맞는 Message를 Consume하기 위해 사용합니다.
 * @param topics
 * @constructor
 */
export function KafkaListener(topics: KafkaTopic[]) {
  return MessagePattern([...topics]);
}
