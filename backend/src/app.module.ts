import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demand } from 'src/entities/demand.entity';
import { DemandController } from 'src/controllers/demand.controller';
import { DemandService } from 'src/services/demand.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Demand],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Demand]),
  ],
  controllers: [DemandController],
  providers: [DemandService],
})
export class AppModule {}
