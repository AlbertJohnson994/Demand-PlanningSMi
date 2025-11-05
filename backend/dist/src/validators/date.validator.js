"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateBefore = void 0;
const class_validator_1 = require("class-validator");
let IsDateBefore = class IsDateBefore {
    validate(startDate, args) {
        const [relatedPropertyName] = args.constraints;
        const endDate = args.object[relatedPropertyName];
        if (!startDate || !endDate) {
            return true;
        }
        return new Date(startDate) < new Date(endDate);
    }
    defaultMessage(args) {
        return 'Start date must be before end date';
    }
};
exports.IsDateBefore = IsDateBefore;
exports.IsDateBefore = IsDateBefore = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDateBefore', async: false })
], IsDateBefore);
//# sourceMappingURL=date.validator.js.map