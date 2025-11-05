import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DemandService } from '../services/demand.service';
import { Demand } from '../entities/demand.entity';
import { CreateDemandDto, UpdateDemandDto } from '../dtos/create-demand.dto';

@Controller('demands')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Get()
  async findAll(): Promise<Demand[]> {
    return this.demandService.findAll();
  }

  @Get('statistics')
  async getStatistics() {
    return this.demandService.getStatistics();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Demand> {
    return this.demandService.findOne(id);
  }

  @Post()
  async create(@Body() createDemandDto: CreateDemandDto): Promise<Demand> {
    return this.demandService.create(createDemandDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDemandDto: UpdateDemandDto,
  ): Promise<Demand> {
    return this.demandService.update(id, updateDemandDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return this.demandService.remove(id);
  }
}
