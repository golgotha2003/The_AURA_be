import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomRequestDto } from './dto/room_request.dto';
import { RoomRepository } from './room.repository';
import { RoomEntity } from './entities/room.entity';
import { FloorService } from 'src/floor/floor.service';
import { UpdateRoomDto } from './dto/update_room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository, private readonly floorService: FloorService) {}

  async create(roomRequest: RoomRequestDto): Promise<RoomEntity> {
    const checkRoom = await this.roomRepository.findByName(roomRequest.name);
    if(checkRoom != null && checkRoom.floor_id == roomRequest.floor_id){
      throw new BadRequestException('Phòng đã tồn tại');
    }
    const checkFloor = await this.floorService.findOne(roomRequest.floor_id);
    if(checkFloor == null || checkFloor.is_closed){
      throw new NotFoundException('Tầng không tồn tại hoặc đã đóng cửa');
    }
    const newRoom = await this.roomRepository.create(roomRequest);
    return newRoom;
  }

  async findAll(): Promise<RoomEntity[]> {
    return await this.roomRepository.findAll();
  }

  async findById(id: number): Promise<RoomEntity | null> {
    return await this.roomRepository.findById(id);
  }

  async findByName(name: string): Promise<RoomEntity | null> {
    return await this.roomRepository.findByName(name);
  }

  async getAllRoomsByFloor(floorId: number): Promise<RoomEntity[]> {
    const checkFloor = await this.floorService.findOne(floorId);
    if(checkFloor == null || checkFloor.is_closed){
      throw new NotFoundException('Tầng không tồn tại hoặc đã đóng cửa');
    }
    return await this.roomRepository.getAllRoomsByFloor(floorId);
  }

  async update(id: number,  updateRoom: UpdateRoomDto) {
    const checkRoom = await this.roomRepository.findById(id);
    if(checkRoom == null || checkRoom.is_closed){
      throw new NotFoundException('Phòng không tồn tại hoặc đã đóng cửa');
    }
    const checkFloor = await this.floorService.findOne(updateRoom.floor_id);
    if(checkFloor == null || checkFloor.is_closed){
      throw new NotFoundException('Tầng không tồn tại hoặc đã đóng cửa');
    }
    return await this.roomRepository.update(id, updateRoom);
  }

  async remove(id: number): Promise<boolean> {
    const checkRoom = await this.roomRepository.findById(id);
    if(checkRoom == null || checkRoom.is_closed){
      throw new NotFoundException('Phòng không tồn tại hoặc đã đóng cửa');
    }
    return await this.roomRepository.remove(id);
  }
}
