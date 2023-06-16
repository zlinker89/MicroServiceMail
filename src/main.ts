import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://franklin:Expertosip%402023.@localhost/`],
        queue: 'email',
        queueOptions: {
          durable: true,
        },
    },
  });
  await app.listen();
}
bootstrap();
