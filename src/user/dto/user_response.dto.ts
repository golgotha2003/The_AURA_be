import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID của người dùng',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Tên của người dùng',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email của người dùng',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Số điện thoại của người dùng',
    example: '0909090909',
  })
  phone_number: string;

  @ApiProperty({
    description: 'Ngày tạo tài khoản',
    example: '2021-01-01',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Ngày cập nhật tài khoản',
    example: '2021-01-01',
  })
  updated_at: Date;
}
