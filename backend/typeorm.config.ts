import { DataSource } from 'typeorm';
import { Demand } from './src/entities/demand.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [Demand],
  synchronize: true, // Only for development
  logging: true,
});
