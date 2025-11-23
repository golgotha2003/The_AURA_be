import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBranchDto } from './create-branch.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
    @ApiProperty({description: 'Tên chi nhánh', example: 'Quận 1'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Địa chỉ', example: '123 Đường ABC'})
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({description: 'Thành phố', example: 'Hồ Chí Minh'})
    @IsString()
    @IsNotEmpty()
    city: string;
}
