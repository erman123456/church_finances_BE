import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { AccountService } from 'src/account/account.service';
import { StatusApproval, TransactionType } from '@prisma/client';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';
import { QueryTransactionDto } from './dto/query-transaction';

@Injectable()
export class TransactionService {
  private response = new ResponseDto()
  constructor(
    private prismaService: PrismaService,
    private accountService: AccountService

  ) { }
  async create(createTransaction: CreateTransactionDto) {
    const account = await this.accountService.findOne(createTransaction?.accountId)
    if (!account.data) {
      this.response.status = StatusResponse.Error;
      this.response.message = "Account not found"
      this.response.data = []
      return this.response;
    }
    try {
      return await this.prismaService.transaction.create({
        data: {
          ...createTransaction,
          statusApproval: StatusApproval.CREATED
        },
      }).then(async (res) => {
        return await this.prismaService.account.update({
          where: { id: createTransaction.accountId },
          data: {
            balance: {
              increment: createTransaction.type === TransactionType.DEBET ? createTransaction.amount : - createTransaction.amount,
            }
          }
        }).then((accountRes) => {
          this.response.status = StatusResponse.Success;
          this.response.message = 'Successfully to process'
          this.response.data = res
          return this.response;
        }).catch(async (e) => {
          console.log('catch 1', e)
          await this.accountService.remove(res.id);
          this.response.status = StatusResponse.Error;
          this.response.message = e.message
          return this.response;
        })
      }).catch((e) => {
        console.log('catch 2', e)
        this.response.status = StatusResponse.Error;
        this.response.message = e.message
        return this.response;
      })
    } catch (e) {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    }
  }


  async findAll() {
    try {
      const data = await this.prismaService.transaction.findMany({ orderBy: { createdAt: 'desc' } });
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

  async findAllByQuery(query: QueryTransactionDto) {
    try {
      const data = await this.prismaService.transaction.findMany({
        skip: query.skip,
        take: query.take,
        where: {
           accountId: query.accountId,
           labelId: query.labelId,
           deletedAt: null,
          },
        orderBy: { createdAt: 'desc' }
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

  async findOne(id: string) {
    try {
      const data = await this.prismaService.transaction.findFirst({
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
      await this.prismaService.account.update({
        where: { id: updateTransactionInput.accountId },
        data: {
          balance: {
            increment: updateTransactionInput.typeBefore === TransactionType.DEBET ? - updateTransactionInput.amountBefore : updateTransactionInput.amountBefore,
          }
        }
      });
      await this.prismaService.account.update({
        where: { id: updateTransactionInput.accountId },
        data: {
          balance: {
            increment: updateTransactionInput.type === TransactionType.DEBET ? updateTransactionInput.amount : - updateTransactionInput.amount,
          }
        }
      });
      const data = await this.prismaService.transaction.update({
        where: {
          id: id,
        },
        data: {
          amount: updateTransactionInput.amount,
          remark: updateTransactionInput.remark,
          type: updateTransactionInput.type,
          updatedAt: new Date()
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
      const data = await this.prismaService.transaction.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date()
        }
      });
      await this.prismaService.account.update({
        where: { id: data.accountId },
        data: {
          balance: {
            increment: data.type === TransactionType.DEBET ? - data.amount : data.amount,
          }
        }
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
