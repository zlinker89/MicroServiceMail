import { Module } from '@nestjs/common';
import { MailService } from './application/services/mail/mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailController } from './infrastructure/controllers/mail.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io', // TODO: use config
        port: 2525,
        auth: {
          user: "8a249627955d77",
          pass: "08d6b0d61110c5"
        }
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [
    MailService, 
  ]
})
export class MailModule {}
