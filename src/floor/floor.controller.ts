import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { FloorService } from './floor.service';
import { FloorRequestDto } from './dto/floor_request.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/jwt/jwt.guard';
import { Roles } from 'src/jwt/decorators/roles.decorator';
import { RolesGuard } from 'src/jwt/guards/roles.guard';

@Controller('floor')
export class FloorController {
  constructor(private readonly floorService: FloorService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Post('/add')
  async create(@Body() floor: FloorRequestDto){
    const newFloor = await this.floorService.create(floor);
    return {
      success: true,
      data: newFloor,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get('/list')
  async findAll() {
    const floors = await this.floorService.findAll();
    return {
      success: true,
      data: floors,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const floor = await this.floorService.findOne(+id);
    return {
      success: true,
      data: floor,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0,1)
  @Get('/list/:branch')
  async findByBranch(@Param('branch') branch: string) {
    const floors = await this.floorService.findByBranch(+branch);
    return {
      success: true,
      data: floors,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() floor: FloorRequestDto) {
    const updatedFloor = await this.floorService.update(+id, floor);
    return {
      success: true,
      data: updatedFloor,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch('/close/:id')
  async close(@Param('id') id: string) {
    const closedFloor = await this.floorService.delete(+id);
    return {
      success: true,
      data: closedFloor,
    };
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(0)
  @Patch('/close-all-by-branch/:branch')
  async closeAllByBranch(@Param('branch') branch: string) {
    const closedFloors = await this.floorService.deleteAllByBranch(+branch);
    return {
      success: true,
      data: closedFloors,
    };
  }
}
