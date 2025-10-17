import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { VerifyOtpDto } from './dto/otp.dto';
import { SendOtpDto } from 'src/otp/dto/send_otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    const message = await this.authService.register(registerDto);
    return {
      success: message.success,
      message: message.message,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const token = await this.authService.login(loginDto);
    return {
      success: token.success,
      data: {
        access_token: token.access_token,
        deviceId: token.deviceId,
      },
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Req() req: Request): Promise<any> {
    const token = req.headers['authorization'].split(' ')[1];
    await this.authService.logout(token);
    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    const isVerified = await this.authService.verifyOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp,
      verifyOtpDto.type,
    );
    return {
      success: isVerified.success,
      data: {
        type: isVerified.type,
      },
    };
  }

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<any> {
    const message = await this.authService.sendOtp(
      sendOtpDto.email,
      sendOtpDto.type,
    );
    return {
      success: message.success,
      message: message.message,
    };
  }
}
