import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AccountService } from 'src/account/account.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    private prismaService: PrismaService,
    private accountService: AccountService

  ) { }
  async create(createTransaction: CreateTransactionDto) {
    const account = await this.accountService.findOne(createTransaction?.accountId)
    if (!account) return { message: "The account not found" }
    try {
      await this.prismaService.transaction.create({
        data: {
          ...createTransaction,
        },
      }).then(async (res) => {
        await this.prismaService.account.update({
          where: { id: createTransaction.accountId },
          data: { balance: { increment: createTransaction.type === TransactionType.DEBET ? createTransaction.amount : - createTransaction.amount } }
        }).then(() => {
          return "success";
        }).catch(async (e) => {
          await this.accountService.remove(res.id);
          throw new ExceptionsHandler(e)
        })
      }).catch((e) => { throw new ExceptionsHandler(e) })

    } catch (e) { throw new ExceptionsHandler(e) }
  }

  findAll() {
    return this.prismaService.transaction.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prismaService.transaction.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateActorInput: any) {
    return this.prismaService.transaction.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.transaction.delete({
      where: {
        id: id,
      },
    });
  }
}
