import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(['hello', 'hello.test'])
  getHello(@Payload() message: { [key: string]: any }) {
    console.log(2);
    return message;
  }
}
