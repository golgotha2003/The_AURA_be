import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { BranchRepository } from './branch.repository';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  async create(createBranchDto: CreateBranchDto) {
    const existingBranch = await this.branchRepository.findByName(
      createBranchDto.name,
    );
    if (existingBranch) {
      throw new BadRequestException('Chi nhánh đã tồn tại');
    }
    const newBranch = await this.branchRepository.create(createBranchDto);
    return newBranch;
  }

  async findAll() {
    const branches = await this.branchRepository.findAll();
    return branches;
  }

  async findOne(id: number) {
    const branch = await this.branchRepository.findOne(id);
    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }
    return branch;
  }

  // async search(query: string) {
  //   const branches = await this.branchRepository.search(query);
  //   return branches;
  // }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const existingBranch = await this.branchRepository.findOne(id);
    if (!existingBranch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }
    const updatedBranch = await this.branchRepository.update(
      id,
      updateBranchDto,
    );
    return updatedBranch;
  }

  async remove(id: number) {
    const existingBranch = await this.branchRepository.findOne(id);
    if (!existingBranch || existingBranch.is_closed) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }
    const deletedBranch = await this.branchRepository.delete(id);
    return deletedBranch;
  }
}
