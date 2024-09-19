import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { KafkaContext } from '@nestjs/microservices';
import { v4 } from 'uuid';

@Injectable()
export class KafkaInterceptor implements NestInterceptor {
  private readonly logger = new Logger(KafkaInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'rpc') return next.handle();

    // region Kafka Context
    const kafkaContext: KafkaContext = context.switchToRpc().getContext();
    const kafkaValue = kafkaContext.getMessage().value;
    // region Kafka Context

    // region Kafka Details
    const handlerMethod = context.getHandler().name;
    const handlerClass = context.getClass().name;
    const handler = `Class - ${handlerClass} / Method - ${handlerMethod}`;
    const { headers: kafkaHeader, timestamp: kafkaTimeStamp } =
      kafkaContext.getMessage();
    const kafkaCreatedAt = new Date(Number(kafkaTimeStamp)).toUTCString();
    const headers = JSON.stringify(kafkaHeader);
    // region Kafka Details

    // traceId
    const traceId = v4();

    const log = {
      transaction: traceId,
      method: 'KafkaInterceptor',
      status: 'Received Kafka Message',
      handler,
      value: kafkaValue,
      topic: kafkaContext.getTopic(),
      partition: kafkaContext.getPartition(),
      headers,
      kafkaCreatedAt,
      createdAt: new Date().toUTCString(),
    };

    this.logger.log(log);

    return next.handle().pipe(
      tap(() => {
        this.logger.log({
          ...log,
          status: 'Processed Kafka Message',
        });
      }),
      catchError((err) => {
        this.logger.error({
          ...log,
          status: 'Error Processing Kafka Message',
          errorMessage: err.message,
        });
        return throwError(() => err); // Re-throw the error for other interceptors or error handlers
      }),
    );
  }
}
