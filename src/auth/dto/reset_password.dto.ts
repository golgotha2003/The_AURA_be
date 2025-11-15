import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Email người dùng',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Mật khẩu mới',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Xác nhận mật khẩu mới',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}