import { UserEntity } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from 'src/database/database.provider';

@Injectable()
export class UserRepository{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async findOne(email: string): Promise<UserEntity | null> {
    const query = 'SELECT * FROM "users" WHERE email = $1 LIMIT 1';
    const result = await this.pool.query(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    const query = 'SELECT * FROM "users" WHERE id = $1 LIMIT 1';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findAll(): Promise<UserEntity[]> {
    const query = 'SELECT * FROM "users"';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const query = `UPDATE "users" 
                    SET 
                        full_name = COALESCE($1, full_name), 
                        phone_number = COALESCE($2, phone_number), 
                        birthday = COALESCE($3, birthday),
                        gender_id = COALESCE($4, gender_id),
                        is_verified = COALESCE($5, is_verified), 
                        is_locked = COALESCE($6, is_locked), 
                        role_id = COALESCE($7, role_id), 
                        created_at = COALESCE($8, created_at), 
                        updated_at = COALESCE($9, updated_at) 
                    WHERE id = $10
                    RETURNING *`;
    const result = await this.pool.query(query, [
      user.full_name,
      user.phone_number,
      user.birthday,
      user.gender_id,
      user.is_verified,
      user.is_locked,
      user.role_id,
      user.created_at,
      user.updated_at,
      user.id,
    ]);
    return result.rows[0];
  }

  async changePassword(id: number, password: string): Promise<UserEntity | null> {
    const query = 'UPDATE "users" SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await this.pool.query(query, [password, id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}
