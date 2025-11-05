import { DemandStatus } from '../entities/demand.entity';
export declare class CreateDemandDto {
    sku: string;
    description: string;
    startDate: Date;
    endDate: Date;
    totalPlanned: number;
    totalProduction?: number;
    status?: DemandStatus;
}
export declare class UpdateDemandDto {
    sku?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    totalPlanned?: number;
    totalProduction?: number;
    status?: DemandStatus;
}
