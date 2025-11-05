import {
  IsString,
  IsDate,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Validate,
} from 'class-validator';
import { DemandStatus } from '../entities/demand.entity';
import { Type } from 'class-transformer';
import { IsDateBefore } from '../validators/date.validator';

export class CreateDemandDto {
  @IsString()
  sku!: string;

  @IsString()
  description!: string;

  @IsDate()
  @Type(() => Date)
  @Validate(IsDateBefore, ['endDate'])
  startDate!: Date;

  @IsDate()
  @Type(() => Date)
  endDate!: Date;

  @IsNumber()
  @Min(0.01, { message: 'Total planned must be greater than 0' })
  totalPlanned!: number;

  @IsNumber()
  @Min(0, { message: 'Total production cannot be negative' })
  @IsOptional()
  totalProduction?: number;

  @IsEnum(DemandStatus)
  @IsOptional()
  status?: DemandStatus;
}

export class UpdateDemandDto {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @Type(() => Date)
  @Validate(IsDateBefore, ['endDate'])
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  totalPlanned?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalProduction?: number;

  @IsEnum(DemandStatus)
  @IsOptional()
  status?: DemandStatus;
}
