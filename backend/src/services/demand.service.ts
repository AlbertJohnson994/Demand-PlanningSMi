import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demand, DemandStatus } from '../entities/demand.entity';
import { CreateDemandDto, UpdateDemandDto } from '../dtos/create-demand.dto';

@Injectable()
export class DemandService {
  constructor(
    @InjectRepository(Demand)
    private readonly demandRepository: Repository<Demand>,
  ) {}

  async findAll(): Promise<Demand[]> {
    return this.demandRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Demand> {
    const demand = await this.demandRepository.findOne({ where: { id } });
    if (!demand) {
      throw new NotFoundException(`Demand with ID ${id} not found`);
    }
    return demand;
  }

  async create(createDemandDto: CreateDemandDto): Promise<Demand> {
    // Check if SKU already exists
    const existingDemand = await this.demandRepository.findOne({
      where: { sku: createDemandDto.sku },
    });

    if (existingDemand) {
      throw new BadRequestException(
        `Demand with SKU ${createDemandDto.sku} already exists`,
      );
    }

    // Validate dates
    this.validateDates(
      new Date(createDemandDto.startDate),
      new Date(createDemandDto.endDate),
    );

    // Set default values
    const demandData = {
      ...createDemandDto,
      totalProduction: createDemandDto.totalProduction || 0,
      status: createDemandDto.status || DemandStatus.PLANNING,
    };

    const demand = this.demandRepository.create(demandData);
    return this.demandRepository.save(demand);
  }

  async update(id: number, updateDemandDto: UpdateDemandDto): Promise<Demand> {
    const demand = await this.findOne(id);

    // Check if SKU is being updated and if it already exists
    if (updateDemandDto.sku && updateDemandDto.sku !== demand.sku) {
      const existingDemand = await this.demandRepository.findOne({
        where: { sku: updateDemandDto.sku },
      });

      if (existingDemand) {
        throw new BadRequestException(
          `Demand with SKU ${updateDemandDto.sku} already exists`,
        );
      }
    }

    // Validate status transition if status is being updated
    if (updateDemandDto.status && demand.status !== updateDemandDto.status) {
      const isValidTransition = this.validateStatusTransition(
        demand.status,
        updateDemandDto.status,
      );
      if (!isValidTransition) {
        throw new BadRequestException(
          `Invalid status transition from ${demand.status} to ${updateDemandDto.status}`,
        );
      }
    }

    // Validate dates if they're being updated
    const startDate = updateDemandDto.startDate
      ? new Date(updateDemandDto.startDate)
      : new Date(demand.startDate);
    const endDate = updateDemandDto.endDate
      ? new Date(updateDemandDto.endDate)
      : new Date(demand.endDate);

    this.validateDates(startDate, endDate);

    // Update demand with new data
    Object.assign(demand, updateDemandDto);
    return this.demandRepository.save(demand);
  }

  async remove(id: number): Promise<void> {
    const demand = await this.findOne(id);
    await this.demandRepository.remove(demand);
  }

  // Date validation
  private validateDates(startDate: Date, endDate: Date): void {
    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    // Additional validation: start date cannot be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new BadRequestException('Start date cannot be in the past');
    }
  }

  // Safe status validation logic with proper typing
  validateStatusTransition(
    currentStatus: DemandStatus,
    newStatus: DemandStatus,
  ): boolean {
    // Define allowed transitions with proper typing
    const allowedTransitions: Record<DemandStatus, DemandStatus[]> = {
      [DemandStatus.PLANNING]: [
        DemandStatus.IN_PROGRESS,
        DemandStatus.PLANNING, // Allow staying in same status
      ],
      [DemandStatus.IN_PROGRESS]: [
        DemandStatus.COMPLETED,
        DemandStatus.IN_PROGRESS, // Allow staying in same status
        DemandStatus.PLANNING, // Allow going back to planning
      ],
      [DemandStatus.COMPLETED]: [
        DemandStatus.COMPLETED, // Allow staying in same status
        DemandStatus.IN_PROGRESS, // Allow going back to in progress
      ],
    };

    const allowed = allowedTransitions[currentStatus];
    return allowed ? allowed.includes(newStatus) : false;
  }

  // Additional method to get demand statistics
  async getStatistics(): Promise<{
    total: number;
    planning: number;
    inProgress: number;
    completed: number;
    totalPlanned: number;
    totalProduced: number;
  }> {
    const demands = await this.findAll();

    return {
      total: demands.length,
      planning: demands.filter((d) => d.status === DemandStatus.PLANNING)
        .length,
      inProgress: demands.filter((d) => d.status === DemandStatus.IN_PROGRESS)
        .length,
      completed: demands.filter((d) => d.status === DemandStatus.COMPLETED)
        .length,
      totalPlanned: demands.reduce(
        (sum, d) => sum + parseFloat(d.totalPlanned.toString()),
        0,
      ),
      totalProduced: demands.reduce(
        (sum, d) => sum + parseFloat(d.totalProduction.toString()),
        0,
      ),
    };
  }
}
