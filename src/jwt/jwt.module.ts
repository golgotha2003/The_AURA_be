import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RedisModule } from 'src/redis/redis.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    RedisModule,
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService]
})
export class JwtModule {}
