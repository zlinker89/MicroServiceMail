import { Controller, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  IAttachment,
  IDataMQ,
  IFileData,
  IMessageMQ,
} from '../interfaces/mail.interface';
import { MailService } from '../../application/services/mail/mail.service';
import { SentMessageInfo } from 'nodemailer';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);
  constructor(
    private _mailerService: MailService,
    private readonly httpService: HttpService,
  ) {}

  @EventPattern({ cmd: 'send-mail' })
  async sendMail(@Payload() payload: string, @Ctx() context: RmqContext) {
    try {
      const data: IDataMQ = JSON.parse(payload);
      const attachments: IAttachment[] = [];
      // get file data
      for (const fileDataId of data.fileDataIds) {
        const $result = this.httpService.get(
          `http://localhost:3001/file-service/file-data/${fileDataId}`,
        );
        const {data, status} = await lastValueFrom($result);
        if (status == HttpStatus.OK) {
          const fileData: IFileData = data.data[0];
          attachments.push({
            filename: fileData.fileName,
            path: `http://localhost:3001/file-service/file-data/${fileDataId}/inline/${fileData.fileName}`,
          });
        }
      }
      // this.logger.debug(data.emailData)
      // this.logger.debug(attachments)
      const result: SentMessageInfo = await this._mailerService.sendMail(
        [data.emailData.from],
        [],
        data.emailData.subject,
        '',
        data.emailData.html,
        attachments,
      );
      console.log(result);
    } catch (error) {
      this.logger.error(error.message || error.msg || error)
    }
  }
}
