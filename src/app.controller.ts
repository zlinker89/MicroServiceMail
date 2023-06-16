import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload } from '@nestjs/microservices/decorators';
import { RmqContext } from '@nestjs/microservices/ctx-host';
import { RpcException } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern({ cmd: 'send-mail' })
  async sendMail(
    @Payload() payload: string,
    @Ctx() context: RmqContext,
  ) {
    console.log("prueba de mensaje")
    console.log(payload);
    
  }
}
