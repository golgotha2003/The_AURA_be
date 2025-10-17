import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;
    
    @ApiProperty({
        description: 'Password of the user',
        example: 'password',
    })
    @IsNotEmpty()
    password: string;
}