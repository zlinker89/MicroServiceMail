import { Module } from '@nestjs/common';
import { MailService } from './application/services/mail/mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

@Module({
  imports: [
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
  providers: [MailService],
  exports: [
    MailService
  ]
})
export class MailModule {}
