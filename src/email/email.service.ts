import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService{
    constructor(private readonly emailService: MailerService) {

    }

    async sendEmail(to: string, subject: string, text: string) {
        await this.emailService.sendMail({
            to,
            subject,
            text,
        });
    }
}