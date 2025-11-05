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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDemandDto = exports.CreateDemandDto = void 0;
const class_validator_1 = require("class-validator");
const demand_entity_1 = require("../entities/demand.entity");
const class_transformer_1 = require("class-transformer");
const date_validator_1 = require("../validators/date.validator");
class CreateDemandDto {
    sku;
    description;
    startDate;
    endDate;
    totalPlanned;
    totalProduction;
    status;
}
exports.CreateDemandDto = CreateDemandDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDemandDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDemandDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Validate)(date_validator_1.IsDateBefore, ['endDate']),
    __metadata("design:type", Date)
], CreateDemandDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateDemandDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01, { message: 'Total planned must be greater than 0' }),
    __metadata("design:type", Number)
], CreateDemandDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Total production cannot be negative' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDemandDto.prototype, "totalProduction", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(demand_entity_1.DemandStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDemandDto.prototype, "status", void 0);
class UpdateDemandDto {
    sku;
    description;
    startDate;
    endDate;
    totalPlanned;
    totalProduction;
    status;
}
exports.UpdateDemandDto = UpdateDemandDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDemandDto.prototype, "sku", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDemandDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Validate)(date_validator_1.IsDateBefore, ['endDate']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateDemandDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateDemandDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDemandDto.prototype, "totalPlanned", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateDemandDto.prototype, "totalProduction", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(demand_entity_1.DemandStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDemandDto.prototype, "status", void 0);
//# sourceMappingURL=create-demand.dto.js.map