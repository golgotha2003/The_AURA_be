import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class FloorRequestDto {
    @ApiProperty({
        description: 'Tên tầng',
        example: 'Tầng 1',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Mô tả tầng',
        example: 'Tầng 1 là tầng dành cho khách hàng',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'ID chi nhánh',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    branch: number;
}