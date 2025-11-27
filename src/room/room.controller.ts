import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRequestDto } from './dto/room_request.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { Roles } from 'src/jwt/decorators/roles.decorator';
import { RolesGuard } from 'src/jwt/guards/roles.guard';
import { UpdateRoomDto } from './dto/update_room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Post()
  async create(@Body() roomRequest: RoomRequestDto): Promise<any> {
    const newRoom = await this.roomService.create(roomRequest);
    return {
      success: true,
      data: newRoom,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get()
  async findAll(): Promise<any> {
    const rooms = await this.roomService.findAll();
    return {
      success: true,
      data: rooms,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const room = await this.roomService.findById(+id);
    return {
      success: true,
      data: room,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get('floor/:floorId')
  async getAllRoomsByFloor(@Param('floorId') floorId: string): Promise<any> {
    const rooms = await this.roomService.getAllRoomsByFloor(+floorId);
    return {
      success: true,
      data: rooms,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoom: UpdateRoomDto): Promise<any> {
    const updatedRoom = await this.roomService.update(+id, updateRoom);
    return {
      success: true,
      data: updatedRoom,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    const deletedRoom = await this.roomService.remove(+id);
    return {
      success: true,
      data: deletedRoom,
    };
  }
}
