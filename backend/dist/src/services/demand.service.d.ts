import { Repository } from 'typeorm';
import { Demand, DemandStatus } from '../entities/demand.entity';
import { CreateDemandDto, UpdateDemandDto } from '../dtos/create-demand.dto';
export declare class DemandService {
    private readonly demandRepository;
    constructor(demandRepository: Repository<Demand>);
    findAll(): Promise<Demand[]>;
    findOne(id: number): Promise<Demand>;
    create(createDemandDto: CreateDemandDto): Promise<Demand>;
    update(id: number, updateDemandDto: UpdateDemandDto): Promise<Demand>;
    remove(id: number): Promise<void>;
    private validateDates;
    validateStatusTransition(currentStatus: DemandStatus, newStatus: DemandStatus): boolean;
    getStatistics(): Promise<{
        total: number;
        planning: number;
        inProgress: number;
        completed: number;
        totalPlanned: number;
        totalProduced: number;
    }>;
}
