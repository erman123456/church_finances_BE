import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AccountService } from 'src/account/account.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, AccountService],
})
export class TransactionModule {}
