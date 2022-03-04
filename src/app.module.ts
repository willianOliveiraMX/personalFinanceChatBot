import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { MonthReferenceEntity } from './monthreference/monthreference.entity';
import { MonthreferenceModule } from './monthreference/monthreference.module';
import { IncomeModule } from './income/income.module';
import { IncomeEntity } from './income/income.entity';
import { DebtModule } from './debt/debt.module';
import { debtEntity } from './debt/debt.entity';
import { DebtGroupModule } from './debt-group/debt-group.module';
import { debtGroupEntity } from './debt-group/debt-group.entity';
import { BalanceModule } from './balance/balance.module';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_URL || 'localhost',
      port: parseInt(process.env.PORT_DATABASE) || 5432,
      username: process.env.USER_DATABASE || 'postgres',
      password: process.env.PASSWORD_DATABASE || '123',
      database: process.env.DATABASE_NAME || 'financeData',
      entities: [
        User, 
        MonthReferenceEntity, 
        IncomeEntity, 
        debtEntity,
        debtGroupEntity,
      ],
      migrations: ['migration/*.js'],
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
    UserModule,
    MonthreferenceModule,
    IncomeModule,
    DebtModule,
    DebtGroupModule,
    BalanceModule,
  ],
})
export class AppModule {}
