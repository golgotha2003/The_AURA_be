import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'John Doe',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email người dùng',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Mật khẩu người dùng',
        example: '123456',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Số điện thoại người dùng',
        example: '0987654321',
    })
    @IsNotEmpty()
    phone_number: string;
}