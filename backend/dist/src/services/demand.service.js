"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const demand_entity_1 = require("../entities/demand.entity");
let DemandService = class DemandService {
    demandRepository;
    constructor(demandRepository) {
        this.demandRepository = demandRepository;
    }
    async findAll() {
        return this.demandRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async findOne(id) {
        const demand = await this.demandRepository.findOne({ where: { id } });
        if (!demand) {
            throw new common_1.NotFoundException(`Demand with ID ${id} not found`);
        }
        return demand;
    }
    async create(createDemandDto) {
        const existingDemand = await this.demandRepository.findOne({
            where: { sku: createDemandDto.sku },
        });
        if (existingDemand) {
            throw new common_1.BadRequestException(`Demand with SKU ${createDemandDto.sku} already exists`);
        }
        this.validateDates(new Date(createDemandDto.startDate), new Date(createDemandDto.endDate));
        const demandData = {
            ...createDemandDto,
            totalProduction: createDemandDto.totalProduction || 0,
            status: createDemandDto.status || demand_entity_1.DemandStatus.PLANNING,
        };
        const demand = this.demandRepository.create(demandData);
        return this.demandRepository.save(demand);
    }
    async update(id, updateDemandDto) {
        const demand = await this.findOne(id);
        if (updateDemandDto.sku && updateDemandDto.sku !== demand.sku) {
            const existingDemand = await this.demandRepository.findOne({
                where: { sku: updateDemandDto.sku },
            });
            if (existingDemand) {
                throw new common_1.BadRequestException(`Demand with SKU ${updateDemandDto.sku} already exists`);
            }
        }
        if (updateDemandDto.status && demand.status !== updateDemandDto.status) {
            const isValidTransition = this.validateStatusTransition(demand.status, updateDemandDto.status);
            if (!isValidTransition) {
                throw new common_1.BadRequestException(`Invalid status transition from ${demand.status} to ${updateDemandDto.status}`);
            }
        }
        const startDate = updateDemandDto.startDate
            ? new Date(updateDemandDto.startDate)
            : new Date(demand.startDate);
        const endDate = updateDemandDto.endDate
            ? new Date(updateDemandDto.endDate)
            : new Date(demand.endDate);
        this.validateDates(startDate, endDate);
        Object.assign(demand, updateDemandDto);
        return this.demandRepository.save(demand);
    }
    async remove(id) {
        const demand = await this.findOne(id);
        await this.demandRepository.remove(demand);
    }
    validateDates(startDate, endDate) {
        if (startDate >= endDate) {
            throw new common_1.BadRequestException('Start date must be before end date');
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
            throw new common_1.BadRequestException('Start date cannot be in the past');
        }
    }
    validateStatusTransition(currentStatus, newStatus) {
        const allowedTransitions = {
            [demand_entity_1.DemandStatus.PLANNING]: [
                demand_entity_1.DemandStatus.IN_PROGRESS,
                demand_entity_1.DemandStatus.PLANNING,
            ],
            [demand_entity_1.DemandStatus.IN_PROGRESS]: [
                demand_entity_1.DemandStatus.COMPLETED,
                demand_entity_1.DemandStatus.IN_PROGRESS,
                demand_entity_1.DemandStatus.PLANNING,
            ],
            [demand_entity_1.DemandStatus.COMPLETED]: [
                demand_entity_1.DemandStatus.COMPLETED,
                demand_entity_1.DemandStatus.IN_PROGRESS,
            ],
        };
        const allowed = allowedTransitions[currentStatus];
        return allowed ? allowed.includes(newStatus) : false;
    }
    async getStatistics() {
        const demands = await this.findAll();
        return {
            total: demands.length,
            planning: demands.filter((d) => d.status === demand_entity_1.DemandStatus.PLANNING)
                .length,
            inProgress: demands.filter((d) => d.status === demand_entity_1.DemandStatus.IN_PROGRESS)
                .length,
            completed: demands.filter((d) => d.status === demand_entity_1.DemandStatus.COMPLETED)
                .length,
            totalPlanned: demands.reduce((sum, d) => sum + parseFloat(d.totalPlanned.toString()), 0),
            totalProduced: demands.reduce((sum, d) => sum + parseFloat(d.totalProduction.toString()), 0),
        };
    }
};
exports.DemandService = DemandService;
exports.DemandService = DemandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demand_entity_1.Demand)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DemandService);
//# sourceMappingURL=demand.service.js.map