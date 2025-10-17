import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RolesGuard } from 'src/jwt/guards/roles.guard';
import { RedisModule } from 'src/redis/redis.module';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [UserService, RolesGuard, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository]
})
export class UserModule {}
