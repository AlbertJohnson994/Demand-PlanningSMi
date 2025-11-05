import { DemandService } from '../services/demand.service';
import { Demand } from '../entities/demand.entity';
import { CreateDemandDto, UpdateDemandDto } from '../dtos/create-demand.dto';
export declare class DemandController {
    private readonly demandService;
    constructor(demandService: DemandService);
    findAll(): Promise<Demand[]>;
    getStatistics(): Promise<{
        total: number;
        planning: number;
        inProgress: number;
        completed: number;
        totalPlanned: number;
        totalProduced: number;
    }>;
    findOne(id: number): Promise<Demand>;
    create(createDemandDto: CreateDemandDto): Promise<Demand>;
    update(id: number, updateDemandDto: UpdateDemandDto): Promise<Demand>;
    remove(id: number): Promise<void>;
}
