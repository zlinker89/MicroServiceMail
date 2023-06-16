import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { MailModule } from './../../../mail.module';
describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService],
      imports: [MailModule]
    })
.compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('sendMail', () => {
    it('should send mail', async () => {
      // Arrange
      const mailList = ['ospi89@hotmail.com'];
      const mailListBCC = ['zlinker89@gmail.com'];
      const subject = 'Asunto de prueba';
      const plainText = 'Hola soy el mensaje';
      const body = '<h3>Hola soy el <b>mensaje</b></h3>';

      // Act
      const result = await service.sendMail(mailList, mailListBCC, subject, plainText, body);

      // Assert
      expect(result).toBeTruthy();
    });
  });
});
