import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FloorModule } from 'src/floor/floor.module';
import { RoomRepository } from './room.repository';

@Module({
  imports: [DatabaseModule, FloorModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
})
export class RoomModule {}
