import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Enviar el email
   * @param email 
   * @param subject 
   * @param plainText 
   * @param body
   */
  async sendMail(emails: string[], emailBCCs: string[], subject: string, plainText: string, body: string): Promise<SentMessageInfo> {
    try {
        return await this.mailerService
        .sendMail({
          to: emails, // List of receivers email address
          bcc: emailBCCs,
          from: 'user@outlook.com', // TODO: define Senders email address
          subject: subject, // Subject line
          text: plainText, // plaintext body
          html: body, // HTML body content
        })
    } catch (error) {
        // TODO: use logger
        console.error(error)
        throw new EmailException(`No pudimos enviar el mensaje`);
    }
  }
}
