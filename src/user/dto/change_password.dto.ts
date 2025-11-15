import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChangePasswordDto{

    @ApiProperty({
        description: 'ID của người dùng',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({
        description: 'Mật khẩu cũ',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    old_password: string;

    @ApiProperty({
        description: 'Mật khẩu mới',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    new_password: string;

    @ApiProperty({
        description: 'Xác nhận mật khẩu mới',
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    confirm_password: string;
}