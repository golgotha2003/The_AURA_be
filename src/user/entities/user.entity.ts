import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  avatar_url: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Column({unique: true})
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Column({nullable: false})
  password: string;

  @IsString()
  @IsNotEmpty()
  @Column({nullable: false})
  full_name: string;

  @IsString()
  @Column()
  @IsPhoneNumber()
  phone_number: string;

  @Column({type: 'date', nullable: true})
  @IsDate()
  birthday: Date;

  @Column({nullable: false, name: 'gender_id'})
  @IsNumber()
  @IsIn([0,1], {message: 'Giới tính chỉ được là 0(Nam) hoặc 1(Nữ)'})
  gender: number;

  @Column({nullable: false, name: 'role_id'})
  role: number;

  @Column({default: false})
  is_locked: boolean;

  @Column({default: false})
  is_verified: boolean;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updated_at: Date;
}