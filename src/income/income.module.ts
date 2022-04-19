import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthreferenceModule } from 'src/monthreference/monthreference.module';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { IncomeController } from './income.controller';
import { IncomeEntity } from './income.entity';
import { IncomeService } from './income.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IncomeEntity]),
    MonthreferenceModule
  ],
  controllers: [IncomeController],
  providers: [
    IncomeService,
    MonthreferenceService
  ],
  exports: [TypeOrmModule, IncomeService]
})
export class IncomeModule {}
