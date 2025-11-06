import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demand } from './entities/demand.entity';
import { DemandController } from './controllers/demand.controller';
import { DemandService } from './services/demand.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Demand],
      synchronize: true, // Only for development - use migrations in production
      logging: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([Demand]),
  ],
  controllers: [DemandController],
  providers: [DemandService],
})
export class AppModule {}
