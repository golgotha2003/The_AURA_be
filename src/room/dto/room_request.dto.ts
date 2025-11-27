import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RoomRequestDto {
    @ApiProperty({
        description: 'Tên phòng',
        example: 'Phòng 101',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Số giường',
        example: 1
    })
    @IsNumber()
    bed: number;

    @ApiProperty({
        description: 'Số phòng tắm',
        example: 1
    })
    @IsNumber()
    bath_room: number;

    @ApiProperty({
        description: 'Loại phòng',
        example: 0
    })
    @IsNumber()
    room_type: number;

    @ApiProperty({
        description: 'Mô tả phòng',
        example: 'Phòng 101 là phòng có 1 giường và 1 phòng tắm'
    })
    @IsString()
    description: string;
    
    @ApiProperty({
        description: 'Giá phòng',
        example: 100000
    })
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Tầng',
        example: 1
    })
    @IsNumber()
    floor_id: number;
}