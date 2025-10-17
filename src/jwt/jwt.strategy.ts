import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Role } from 'src/user/enum/role.enum';
import { RedisService } from 'src/redis/redis.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default-secret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request,
    payload: any,
  ): Promise<{ id: number; email: string; role: Role }> {
    const storedToken = await this.redisService.getToken(payload.email, payload.deviceId);
    const token = req.headers['authorization'].split(' ')[1];
    if(storedToken !== token || !storedToken){
      throw new UnauthorizedException('Invalid token');
    }

    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
