import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { OtpService } from 'src/otp/otp.service';
import { AuthType } from './enum/auth.enum';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private redisService: RedisService,
        private otpService: OtpService,
        private authRepository: AuthRepository
    ) {}

    async register(registerDto: RegisterDto): Promise<any>{
        const hashPassword = await bcrypt.hash(registerDto.password, 10);
        registerDto.password = hashPassword;
        await this.authRepository.save(registerDto);
        await this.sendOtp(registerDto.email, AuthType.REGISTER);
        return {
            success: true,
            message: 'Đăng ký thành công. Vui lòng kiểm tra email để lấy otp xác thực'
        };
    }

    async login(loginDto: LoginDto){
        if (!loginDto || !loginDto.email) {
            throw new UnauthorizedException('Email là bắt buộc');
        }
        
        const user = await this.authRepository.findOne(loginDto.email);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        
        const isPasswordValid = await bcrypt.compare(loginDto.password, user?.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Mật khẩu không chính xác');
        }

        if(user.is_locked){
            throw new UnauthorizedException('Tài khoản đã bị khóa, vui lòng liên hệ quản trị viên');
        }

        if(!user.is_verified){
            throw new UnauthorizedException('Tài khoản chưa được xác thực');
        }
        
        const deviceId = uuidv4();
        const payload = {
            id: user.id, 
            email: user.email, 
            role: user.role_id,
            deviceId: deviceId
        };

        const token = await this.jwtService.sign(payload);

        await this.redisService.setToken(user.email, deviceId, token);
        return {
            success: true,
            access_token: token,
            deviceId: deviceId
        };
    }

    async logout(token: string){
        const payload = await this.jwtService.verify(token);
        await this.redisService.delToken(payload.email, payload.deviceId);
    }

    async forgetPassword(email: string){
        const user = await this.authRepository.findOne(email);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        const message = await this.sendOtp(email, AuthType.FORGET_PASSWORD);
        return message;
    }

    async resetPassword(email: string, password: string){
        const user = await this.authRepository.findOne(email);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await this.authRepository.updatePassword(email, hashPassword);
        if(!result){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        return true;
    }

    async sendOtp(email: string, type: string): Promise<any>{
        const user = await this.authRepository.findOne(email);
        if(!user){
            throw new NotFoundException('Người dùng không tồn tại');
        }
        if(type === AuthType.REGISTER){
            if(user.is_verified){
                return {
                    success: false,
                    message: 'Tài khoản đã được xác thực'
                }
            }
        }
        await this.otpService.saveOtp(email, type);
        return {
            success: true,
            message: 'Mã OTP đã được gửi về email của bạn'
        };
    }

    async verifyOtp(email: string, otp: string, type: string): Promise<any>{
        const isVerified = await this.otpService.verifyOtp(email, otp, type);
        if(isVerified && type === AuthType.REGISTER){
            await this.updateAccount(email, type, null);
        }
        return {
            success: isVerified,
            type: type
        };
    }

    async updateAccount(email: string, type: string, password: string | null): Promise<any>{
        if(type === AuthType.REGISTER){
            const success = await this.authRepository.verifyAccount(email);
            if(!success){
                throw new NotFoundException('Người dùng không tồn tại');
            }
            return {
                success: true,
                message: 'Tài khoản đã được xác thực'
            };
        }
        if(type === AuthType.FORGET_PASSWORD){
            if(!password){
                throw new UnauthorizedException('Mật khẩu là bắt buộc');
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const success = await this.authRepository.updatePassword(email, hashPassword);
            if(!success){
                throw new NotFoundException('Người dùng không tồn tại');
            }
            return {
                success: true,
                message: 'Mật khẩu đã được cập nhật'
            };
        }
    }
}
