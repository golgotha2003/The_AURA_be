import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enum/role.enum';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({unique: true})
  email: string;

  @Column({nullable: false})
  password: string;

  @Column()
  phone_number: string;

  @Column({default: false})
  is_active: boolean;

  @Column({default: false})
  is_locked: boolean;

  @Column({default: Role.CUSTOMER})
  role: Role;

  @Column()
  created_at: Date;

  @Column({nullable: true})
  updated_at: Date;
}