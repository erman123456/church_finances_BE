import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AccountService } from 'src/account/account.service';
import { TransactionType } from '@prisma/client';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';

@Injectable()
export class TransactionService {
  private response = new ResponseDto()
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


  async findAll() {
    try {
      const data = await this.prismaService.user.findMany({ orderBy: { createdAt: 'desc' } });
      this.response.status = StatusResponse.Success;
      this.response.message = 'Successfully to process'
      this.response.data = data
      return this.response;
    }
    catch (e) {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });
      this.response.status = StatusResponse.Success;
      this.response.message = 'Successfully to process'
      this.response.data = data
      return this.response;
    }
    catch (e) {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    }
  }

  async update(id: string, updateTransactionInput: any) {
    try {
      const data = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateTransactionInput,
        },
      });
      this.response.status = StatusResponse.Success;
      this.response.message = 'Successfully to process'
      this.response.data = data
      return this.response;
    }
    catch (e) {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    }

  }

  async remove(id: string) {
    try {
      const data = await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
      this.response.status = StatusResponse.Success;
      this.response.message = 'Successfully to process'
      this.response.data = data
      return this.response;
    }
    catch (e) {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    }
  }
}
