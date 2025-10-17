import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('MAILER_HOST'),
                    port: parseInt(configService.get('MAILER_PORT') ?? '587'),
                    secure: false,
                    auth: {
                        user: configService.get('MAILER_USER'),
                        pass: configService.get('MAILER_PASSWORD'),
                    },
                    default: {
                        from: 'No reply <noreply@example.com>'
                    }
                }
            }),
            inject: [ConfigService],
        })
    ],
    providers: [EmailService],
    exports: [EmailService],
})
export class EmailModule {}