import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from 'src/database/database.provider';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async save(registerDto: RegisterDto): Promise<UserEntity> {
    try {
      const query =
        'INSERT INTO "users" (full_name, email, password, phone_number, birthday, gender_id) VALUES ($1, $2, $3, $4, $5, $6)';
      const result = await this.pool.query(query, [
        registerDto.full_name,
        registerDto.email,
        registerDto.password,
        registerDto.phone_number,
        registerDto.birthday,
        registerDto.gender_id,
      ]);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tạo người dùng');
    }
  }

  async findOne(email: string): Promise<UserEntity | null> {
    try {
      const query = 'SELECT * FROM "users" WHERE email = $1 LIMIT 1';
      const result = await this.pool.query(query, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tìm kiếm người dùng');
    }
  }

  async verifyAccount(email: string): Promise<boolean> {
    try {
      const query =
        'UPDATE "users" SET is_verified = TRUE, updated_at = NOW() WHERE email = $1 RETURNING *';
      const result = await this.pool.query(query, [email]);
      if (result.rows.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi xác thực tài khoản');
    }
  }

  async updatePassword(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    try {
      const query =
        'UPDATE "users" SET password = $1, updated_at = NOW() WHERE email = $2 RETURNING *';
      const result = await this.pool.query(query, [password, email]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi cập nhật mật khẩu');
    }
  }
}
