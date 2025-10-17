import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: 'Mật khẩu mới',
        example: '123456'
    })
    password: string;

    @ApiProperty({
        description: 'Trạng thái tài khoản',
        example: true
    })
    @IsBoolean()
    is_active: boolean;

    @ApiProperty({
        description: 'Số điện thoại',
        example: '0909090909'
    })
    @IsString()
    phone_number: string;

    @ApiProperty({
        description: 'Tên người dùng',
        example: 'John Doe'
    })
    @IsString()
    name: string;
    
    @ApiProperty({
        description: 'Trạng thái khóa tài khoản',
        example: true
    })
    @IsBoolean()
    is_locked: boolean;
}