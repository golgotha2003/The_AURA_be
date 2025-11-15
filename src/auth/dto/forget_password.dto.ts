import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgetPasswordDto {
  
  @ApiProperty({ description: 'Email của người dùng' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
