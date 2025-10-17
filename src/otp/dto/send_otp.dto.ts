import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SendOtpDto {
    @ApiProperty({
        description: 'Email người dùng',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Loại OTP',
        example: 'register',
    })
    @IsNotEmpty()
    type: string;
}