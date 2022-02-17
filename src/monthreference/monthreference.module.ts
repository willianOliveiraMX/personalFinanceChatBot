import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthreferenceController } from './monthreference.controller';
import { MonthReferenceEntity } from './monthreference.entity';
import { MonthreferenceService } from './monthreference.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonthReferenceEntity])],
  controllers: [MonthreferenceController],
  providers: [MonthreferenceService],
  exports: [TypeOrmModule]
})
export class MonthreferenceModule {}
