import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FloorRepository } from './floor.repository';
import { FloorRequestDto } from './dto/floor_request.dto';
import { FloorEntity } from './entities/floor.entity';
import { BranchService } from 'src/branch/branch.service';

@Injectable()
export class FloorService {
    constructor(private readonly floorRepository: FloorRepository, private readonly branchService: BranchService) {}

    async create(floor: FloorRequestDto): Promise<FloorEntity> {
        const checkBranch = await this.branchService.findOne(floor.branch);
        if (checkBranch == null || checkBranch.is_closed) {
            throw new NotFoundException('Chi nhánh không tồn tại hoặc đã đóng cửa');
        }
        const checkFloor = await this.floorRepository.findByName(floor.name);
        if (checkFloor != null && checkFloor.branch == floor.branch) {
            throw new BadRequestException('Tầng đã tồn tại');
        }
        const newFloor = await this.floorRepository.create(floor);
        return newFloor;
    }

    async findAll(): Promise<FloorEntity[]> {
        const floors = await this.floorRepository.findAll();
        return floors;
    }

    async findOne(id: number): Promise<FloorEntity | null> {    
        return this.floorRepository.findOne(id);
    }

    async findByBranch(branch: number): Promise<FloorEntity[]> {
        const checkBranch = await this.branchService.findOne(branch);
        if (checkBranch == null || checkBranch.is_closed) {
            throw new NotFoundException('Chi nhánh không tồn tại hoặc đã đóng cửa');
        }
        const floors = await this.floorRepository.findByBranch(branch);
        return floors;
    }

    async update(id: number, floor: FloorRequestDto): Promise<FloorEntity | null> {
        const checkBranch = await this.branchService.findOne(floor.branch);
        if (checkBranch == null || checkBranch.is_closed) {
            throw new NotFoundException('Chi nhánh không tồn tại hoặc đã đóng cửa');
        }
        const checkFloor = await this.floorRepository.findOne(id);
        if (checkFloor == null || checkFloor.is_closed) {
            throw new NotFoundException('Không tìm thấy tầng');
        }
        const updatedFloor = await this.floorRepository.update(id, floor);
        return updatedFloor;
    }

    async delete(id: number): Promise<boolean> {
        const checkFloor = await this.floorRepository.findOne(id);
        if (checkFloor == null) {
            throw new NotFoundException('Không tìm thấy tầng');
        }
        const deletedFloor = await this.floorRepository.delete(id);
        return deletedFloor;
    }

    async deleteAllByBranch(branch: number): Promise<boolean> {
        return this.floorRepository.deleteAllByBranch(branch);
    }
}
