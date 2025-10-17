import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifyOtpDto {
    @ApiProperty({
        description: 'Email của người dùng',
        example: 'example@example.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Mã OTP của người dùng',
        example: '123456'
    })
    @IsNotEmpty()
    otp: string;
    
    @ApiProperty({
        description: 'Loại OTP của người dùng',
        example: 'register'
    })
    @IsNotEmpty()
    type: string;
}