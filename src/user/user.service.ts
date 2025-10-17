import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) {}

    async create(registerDto: RegisterDto): Promise<User> { 
        const existingUser = await this.userRepository.findOne(registerDto.email);
        if(existingUser){
            throw new BadRequestException('Email đã tồn tại');
        }
        const user = new User();
        user.name = registerDto.name;
        user.email = registerDto.email;
        user.password = registerDto.password;
        user.phone_number = registerDto.phone_number;
        user.created_at = new Date();
        return this.userRepository.save(user);
    }

    async update(email: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne(email);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }

        if(updateUserDto.password){
            user.password = updateUserDto.password;
        }
        if(updateUserDto.phone_number){
            user.phone_number = updateUserDto.phone_number;
        }
        if(updateUserDto.name){
            user.name = updateUserDto.name;
        }
        if(updateUserDto.is_locked){
            user.is_locked = updateUserDto.is_locked;
        }
        if(updateUserDto.is_active){
            user.is_active = updateUserDto.is_active;
        }
        user.updated_at = new Date();
        await this.userRepository.update(user);
        return user;
    }

    async findOne(email: string): Promise<User | null> {
        return this.userRepository.findOne(email);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }

}
