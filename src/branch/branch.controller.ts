import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Roles } from 'src/jwt/decorators/roles.decorator';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { RolesGuard } from 'src/jwt/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Post('/add')
  async create(@Body() createBranchDto: CreateBranchDto) {
    const newBranch = await this.branchService.create(createBranchDto);
    return {
      success: true,
      data: newBranch,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get('/list')
  async findAll() {
    const branches = await this.branchService.findAll();
    return {
      success: true,
      data: branches,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const branch = await this.branchService.findOne(+id);
    return {
      success: true,
      data: branch,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    const updatedBranch = await this.branchService.update(+id, updateBranchDto);
    return {
      success: true,
      data: updatedBranch,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch('/close/:id')
  async close(@Param('id') id: string) {
    const deletedBranch = await this.branchService.remove(+id);
    return {
      success: true,
      data: deletedBranch,
    };
  }
}
