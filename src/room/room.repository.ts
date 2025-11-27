import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Pool } from 'pg';
import { RoomRequestDto } from './dto/room_request.dto';
import { PG_POOL } from 'src/database/database.provider';
import { RoomEntity } from './entities/room.entity';
import { UpdateRoomDto } from './dto/update_room.dto';

export class RoomRepository {
  constructor(
    @Inject(PG_POOL) private readonly pool: Pool,
  ) {}

  async create(roomRequest: RoomRequestDto): Promise<RoomEntity> {
    try {
      const roomTypeQuery = 'SELECT * FROM rooms_type WHERE code = $1';
      const roomTypeResult = await this.pool.query(roomTypeQuery, [roomRequest.room_type]);
      if(roomTypeResult.rows.length === 0){
        throw new NotFoundException('Loại phòng không tồn tại');
      }
      
      const query =
        'INSERT INTO rooms (name, bed, bath_room, room_type, description, price, floor_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [
        roomRequest.name,
        roomRequest.bed,
        roomRequest.bath_room,
        roomRequest.room_type,
        roomRequest.description,
        roomRequest.price,
        roomRequest.floor_id,
      ];
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tạo phòng');
    }
  }

  async findAll(): Promise<RoomEntity[]> {
    try {
      const query = 'SELECT * FROM rooms WHERE is_closed = FALSE';
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy danh sách phòng');
    }
  }

  async findById(id: number): Promise<RoomEntity | null> {
    try {
      const query = 'SELECT * FROM rooms WHERE id = $1 AND is_closed = FALSE';
      const result = await this.pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy thông tin phòng');
    }
  }

  async findByName(name: string): Promise<RoomEntity | null> {
    try {
      const query = 'SELECT * FROM rooms WHERE name = $1 AND is_closed = FALSE';
      const result = await this.pool.query(query, [name]);
      return result.rows[0] || null;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy thông tin phòng');
    }
  }

  async getAllRoomsByFloor(id: number): Promise<RoomEntity[]> {
    try {
      const query =
        'SELECT * FROM rooms WHERE floor_id = $1 AND is_closed = FALSE';
      const result = await this.pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy danh sách phòng');
    }
  }

  async update(
    id: number,
    updateRoom: UpdateRoomDto,
  ): Promise<RoomEntity> {
    try {
      const roomTypeQuery = 'SELECT * FROM rooms_type WHERE code = $1';
      const roomTypeResult = await this.pool.query(roomTypeQuery, [updateRoom.room_type]);
      if(roomTypeResult.rows.length === 0){
        throw new NotFoundException('Loại phòng không tồn tại');
      }
      const roomStatusQuery = 'SELECT * FROM rooms_status WHERE code = $1';
      const roomStatusResult = await this.pool.query(roomStatusQuery, [updateRoom.status_id]);
      if(roomStatusResult.rows.length === 0){
        throw new NotFoundException('Trạng thái phòng không tồn tại');
      }

      const query =
        `UPDATE rooms SET name = $1, bed = $2, bath_room = $3, room_type = $4, status_id = $5, description = $6, price = $7, floor_id = $8, updated_at = NOW() 
        WHERE id = $9 AND is_closed = FALSE RETURNING *`;
      const values = [
        updateRoom.name,
        updateRoom.bed,
        updateRoom.bath_room,
        updateRoom.room_type,
        updateRoom.status_id,
        updateRoom.description,
        updateRoom.price,
        updateRoom.floor_id,
        id,
      ];
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Lỗi khi cập nhật phòng');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const query = 'UPDATE rooms SET is_closed = TRUE, updated_at = NOW() WHERE id = $1 RETURNING *';
      const result = await this.pool.query(query, [id]);
      if (result.rows.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi xóa phòng');
    }
  }
}
