import { BadRequestException, Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { Roles } from 'src/jwt/decorators/roles.decorator';
import { RolesGuard } from 'src/jwt/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user_response.dto';
import { ChangePasswordDto } from './dto/change_password.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserGuard } from 'src/jwt/guards/user.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @ApiBearerAuth('access-token')
    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(0)
    async findAll(): Promise<any> {
        const users = await this.userService.findAll();
        return {
            success: true,
            data: users,
        };
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard, UserGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
        const user = await this.userService.findOneById(id);
        return {
            success: true,
            data: user,
        };
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard, UserGuard)
    @Put('change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<any> {
        if(changePasswordDto.new_password !== changePasswordDto.confirm_password){
            throw new BadRequestException('Mật khẩu mới và xác nhận mật khẩu mới không khớp');
        }
        const result = await this.userService.changePassword(changePasswordDto.id, changePasswordDto.old_password, changePasswordDto.new_password);
        return {
            success: true,
            data: result,
        };
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtGuard, UserGuard)
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        const result = await this.userService.update(id, updateUserDto);
        return {
            success: true,
            data: result,
        };
    }
}
