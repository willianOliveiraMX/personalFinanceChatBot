import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtGroupModule } from 'src/debt-group/debt-group.module';
import { DebtGroupService } from 'src/debt-group/debt-group.service';
import { MonthreferenceModule } from 'src/monthreference/monthreference.module';
import { MonthreferenceService } from 'src/monthreference/monthreference.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { DebtController } from './debt.controller';
import { debtEntity } from './debt.entity';
import { DebtService } from './debt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([debtEntity]),
    MonthreferenceModule,
    DebtGroupModule,
    UserModule,
  ],
  controllers: [DebtController],
  providers: [
    DebtService,
    MonthreferenceService,
    DebtGroupService,
    UserService,
  ],
  exports: [TypeOrmModule, DebtService]
})
export class DebtModule {}
