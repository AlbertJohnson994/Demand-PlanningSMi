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
exports.DemandController = void 0;
const common_1 = require("@nestjs/common");
const demand_service_1 = require("../services/demand.service");
const create_demand_dto_1 = require("../dtos/create-demand.dto");
let DemandController = class DemandController {
    demandService;
    constructor(demandService) {
        this.demandService = demandService;
    }
    async findAll() {
        return this.demandService.findAll();
    }
    async getStatistics() {
        return this.demandService.getStatistics();
    }
    async findOne(id) {
        return this.demandService.findOne(id);
    }
    async create(createDemandDto) {
        return this.demandService.create(createDemandDto);
    }
    async update(id, updateDemandDto) {
        return this.demandService.update(id, updateDemandDto);
    }
    async remove(id) {
        return this.demandService.remove(id);
    }
};
exports.DemandController = DemandController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_demand_dto_1.CreateDemandDto]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_demand_dto_1.UpdateDemandDto]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "remove", null);
exports.DemandController = DemandController = __decorate([
    (0, common_1.Controller)('demands'),
    __metadata("design:paramtypes", [demand_service_1.DemandService])
], DemandController);
//# sourceMappingURL=demand.controller.js.map