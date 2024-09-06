import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { LabelModule } from './label/label.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AccountModule, TransactionModule, LabelModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
