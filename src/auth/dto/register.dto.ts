import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsNumber } from "class-validator";

export class RegisterDto {

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'John Doe',
    })
    @IsNotEmpty()
    full_name: string;

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

    @ApiProperty({
        description: 'Ngày sinh người dùng',
        example: '2000-01-01',
    })
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({
        description: 'Giới tính người dùng',
        example: 0,
    })
    @IsNotEmpty()
    @IsIn([0,1], {message: 'Giới tính chỉ được là 0(Nam) hoặc 1(Nữ)'})
    @IsNumber()
    gender: number;
}