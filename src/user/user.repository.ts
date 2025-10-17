import { User } from './entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from 'src/database/database.provider';

@Injectable()
export class UserRepository{
  constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

  async findOne(email: string): Promise<User | null> {
    const query = 'SELECT * FROM "users" WHERE email = $1 LIMIT 1';
    const result = await this.pool.query(query, [email]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }

  async findAll(): Promise<User[]> {
    const query = 'SELECT * FROM "users"';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async save(user: User): Promise<User> {
    const query =
      'INSERT INTO "users" (name, email, password, phone_number, is_active, is_locked, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const result = await this.pool.query(query, [
      user.name,
      user.email,
      user.password,
      user.phone_number,
      user.is_active,
      user.is_locked,
      user.role,
      user.created_at,
      user.updated_at,
    ]);
    return result.rows[0];
  }

  async update(user: User): Promise<User> {
    const query = `UPDATE "users" 
                    SET 
                        name = COALESCE($1, name), 
                        password = COALESCE($2, password), 
                        phone_number = COALESCE($3, phone_number), 
                        is_active = COALESCE($4, is_active), 
                        is_locked = COALESCE($5, is_locked), 
                        role = COALESCE($6, role), 
                        created_at = COALESCE($7, created_at), 
                        updated_at = COALESCE($8, updated_at) 
                    WHERE id = $9`;
    const result = await this.pool.query(query, [
      user.name,
      user.password,
      user.phone_number,
      user.is_active,
      user.is_locked,
      user.role,
      user.created_at,
      user.updated_at,
      user.id,
    ]);
    return result.rows[0];
  }
}
