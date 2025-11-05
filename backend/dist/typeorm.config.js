"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const demand_entity_1 = require("./src/entities/demand.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [demand_entity_1.Demand],
    synchronize: true,
    logging: true,
});
//# sourceMappingURL=typeorm.config.js.map