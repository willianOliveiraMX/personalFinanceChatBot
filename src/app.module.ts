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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'financeData',
      entities: [
        User, 
        MonthReferenceEntity, 
        IncomeEntity, 
        debtEntity
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
  ],
})
export class AppModule {}
