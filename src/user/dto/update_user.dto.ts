import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsIn, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {

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
    full_name: string;

    @ApiProperty({
        description: 'Ngày sinh',
        example: '2000-01-01'
    })
    @IsDate()
    birthday: Date;

    @ApiProperty({
        description: 'Giới tính',
        example: 0
    })
    @IsNumber()
    @IsIn([0,1], {message: 'Giới tính chỉ được là 0(Nam) hoặc 1(Nữ)'})
    gender_id: number;
}