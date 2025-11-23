import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BranchRepository } from './branch.repository';

@Module({
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  imports: [DatabaseModule],
  exports: [BranchService],
})
export class BranchModule {}
