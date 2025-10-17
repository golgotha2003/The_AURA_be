import { Module } from "@nestjs/common";
import { EmailModule } from "src/email/email.module";
import { RedisModule } from "src/redis/redis.module";
import { OtpService } from "./otp.service";

@Module({
    imports: [
        EmailModule,
        RedisModule,
    ],
    providers: [OtpService],
    exports: [OtpService],
})
export class OtpModule {}