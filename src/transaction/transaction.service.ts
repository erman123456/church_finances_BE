import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    private prismaService: PrismaService, 
    private accountService: AccountService

  ) { }
  async create(createTransaction: CreateTransactionDto) {
    const account = this.accountService.findOne(createTransaction?.accountId)
    if (!account) return {message: "The account not found"}
    await this.prismaService.transaction.create({
      data: {
        ...createTransaction,
      },
    }).then(async (res) => {
      await this.prismaService.transaction.create({
        data: {
          ...createTransaction,
        },
      }).then(() => {

      }).catch((e) => { throw new ExceptionsHandler(e) })
    }).catch((e) => { throw new ExceptionsHandler(e) })
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
