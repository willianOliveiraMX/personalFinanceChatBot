import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthreferenceModule } from 'src/monthreference/monthreference.module';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { DebtController } from './debt.controller';
import { debtEntity } from './debt.entity';
import { DebtService } from './debt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([debtEntity]),
    MonthreferenceModule,
  ],
  controllers: [DebtController],
  providers: [
    DebtService,
    MonthreferenceService,
  ],
  exports: [TypeOrmModule, DebtService]
})
export class DebtModule {}
