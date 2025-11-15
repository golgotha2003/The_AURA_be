import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { VerifyOtpDto } from './dto/otp.dto';
import { SendOtpDto } from 'src/otp/dto/send_otp.dto';
import { ResetPasswordDto } from './dto/reset_password.dto';
import { ForgetPasswordDto } from './dto/forget_password.dto';

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

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto): Promise<any> {
    return await this.authService.forgetPassword(forgetPasswordDto.email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    if (resetPasswordDto.password !== resetPasswordDto.confirm_password) {
      throw new BadRequestException('Mật khẩu và xác nhận mật khẩu không khớp');
    }
    const isReset = await this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.password,
    );
    return {
      success: isReset,
      data: 'Mật khẩu đã được cập nhật',
    };
  }
}
