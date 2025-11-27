import { Module } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorController } from './floor.controller';
import { BranchModule } from 'src/branch/branch.module';
import { FloorRepository } from './floor.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [BranchModule, DatabaseModule],
  controllers: [FloorController],
  providers: [FloorService, FloorRepository],
  exports: [FloorService],
})
export class FloorModule {}
