import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { Roles } from 'src/jwt/decorators/roles.decorator';
import { RolesGuard } from 'src/jwt/guards/roles.guard';
import { Role } from './enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user_response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @ApiBearerAuth('access-token')
    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll(): Promise<any> {
        const users = await this.userService.findAll();
        const userResponseDtos = Array<UserResponseDto>();
        for(const user of users){
            const userResponseDto = new UserResponseDto();
            userResponseDto.id = user.id;
            userResponseDto.name = user.name;
            userResponseDto.email = user.email;
            userResponseDto.phone_number = user.phone_number;
            userResponseDto.created_at = user.created_at;
            userResponseDto.updated_at = user.updated_at;
            userResponseDtos.push(userResponseDto);
        }
        return {
            success: true,
            data: userResponseDtos,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
        const user = await this.userService.findOne(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const userResponseDto = new UserResponseDto();
        userResponseDto.id = user.id;
        userResponseDto.name = user.name;
        userResponseDto.email = user.email;
        userResponseDto.phone_number = user.phone_number;
        userResponseDto.created_at = user.created_at;
        userResponseDto.updated_at = user.updated_at;
        return {
            success: true,
            data: userResponseDto,
        };
    }
}
