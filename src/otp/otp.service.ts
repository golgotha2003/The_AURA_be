import { Injectable } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class OtpService{
    constructor(private readonly emailService: EmailService, private readonly redisService: RedisService){
        
    }

    generateOtp(length: number): string{
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        return otp.substring(0, length);
    }

    async saveOtp(email: string, type: string){
        const otp = this.generateOtp(6);
        await this.redisService.setOTP(email, otp, type);
        await this.emailService.sendEmail(email, 'Xác thực OTP', `Mã xác thực của bạn là: ${otp} \n Lưu ý: Mã này có thời hạn trong vòng 5 phút.`);
    }

    async verifyOtp(email: string, otp: string, type: string): Promise<boolean>{
        const savedOtp = await this.redisService.getOTP(email, type);
        if(savedOtp === otp){
            return true;
        }
        await this.redisService.delOTP(email, type);
        return false;
    }
}