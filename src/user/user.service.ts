import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/user_response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOneById(id);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        if(updateUserDto.phone_number){
            user.phone_number = updateUserDto.phone_number;
        }
        if(updateUserDto.full_name){
            user.full_name = updateUserDto.full_name;
        }
        if(updateUserDto.birthday){
            user.birthday = updateUserDto.birthday;
        }
        if(updateUserDto.gender){
            user.gender = updateUserDto.gender;
        }
        user.updated_at = new Date();
        const result = await this.userRepository.update(user);
        const userResponse = new UserResponseDto();
        userResponse.id = result.id;
        userResponse.full_name = result.full_name;
        userResponse.email = result.email;
        userResponse.phone_number = result.phone_number;
        userResponse.birthday = result.birthday;
        userResponse.gender = result.gender;
        userResponse.role = result.role;
        userResponse.is_verified = result.is_verified;
        userResponse.is_locked = result.is_locked;
        userResponse.created_at = result.created_at;
        userResponse.updated_at = result.updated_at;
        return userResponse;
    }

    async findOneById(id: number): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOneById(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const userResponse = new UserResponseDto();
        userResponse.id = user.id;
        userResponse.full_name = user.full_name;
        userResponse.email = user.email;
        userResponse.phone_number = user.phone_number;
        userResponse.birthday = user.birthday;
        userResponse.gender = user.gender;
        userResponse.role = user.role;
        userResponse.is_verified = user.is_verified;
        userResponse.is_locked = user.is_locked;
        userResponse.created_at = user.created_at;
        userResponse.updated_at = user.updated_at;
        return userResponse;
    }

    async findOne(email: string): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findOne(email);
        if(!user){
            throw new NotFoundException('User not found');
        }
        const userResponse = new UserResponseDto();
        userResponse.id = user.id;
        userResponse.full_name = user.full_name;
        userResponse.email = user.email;
        userResponse.phone_number = user.phone_number;
        userResponse.birthday = user.birthday;
        userResponse.gender = user.gender;
        userResponse.role = user.role;
        userResponse.is_verified = user.is_verified;
        userResponse.is_locked = user.is_locked;
        userResponse.created_at = user.created_at;
        userResponse.updated_at = user.updated_at;
        return userResponse;
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => {
            const userResponse = new UserResponseDto();
            userResponse.id = user.id;
            userResponse.full_name = user.full_name;
            userResponse.email = user.email;
            userResponse.phone_number = user.phone_number;
            userResponse.birthday = user.birthday;
            userResponse.gender = user.gender;
            userResponse.role = user.role;
            userResponse.is_verified = user.is_verified;
            userResponse.is_locked = user.is_locked;
            userResponse.created_at = user.created_at;
            userResponse.updated_at = user.updated_at;
            return userResponse;
        });
    }

    async changePassword(id: number, old_password: string, new_password: string){
        const user = await this.userRepository.findOneById(id);
        if(!user){
            throw new NotFoundException('Không tìm thấy người dùng');
        }
        const isMatch = await bcrypt.compare(old_password, user.password);
        if(!isMatch){
            throw new BadRequestException('Mật khẩu cũ không khớp');
        }
        const hashPassword = await bcrypt.hash(new_password, 10);
        const result = await this.userRepository.changePassword(id, hashPassword);
        if(!result){
            throw new InternalServerErrorException('Có lỗi xảy ra khi thay đổi mật khẩu');
        }

        const userResponse = new UserResponseDto();
        userResponse.id = result.id;
        userResponse.full_name = result.full_name;
        userResponse.email = result.email;
        userResponse.phone_number = result.phone_number;
        userResponse.birthday = result.birthday;
        userResponse.gender = result.gender;
        userResponse.role = result.role;
        userResponse.is_verified = result.is_verified;
        userResponse.is_locked = result.is_locked;
        userResponse.created_at = result.created_at;
        userResponse.updated_at = result.updated_at;
        return userResponse;
    }
}
