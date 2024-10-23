import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';
import { QueryAccountDto } from './dto/query-account';

@Injectable()
export class AccountService {
  private response = new ResponseDto();
  constructor(private prismaService: PrismaService) { }
  async create(createAccount: CreateAccountDto) {
    try {
      const data = await this.prismaService.account.create({
        data: {
          ...createAccount,
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

  async findAll(param: QueryAccountDto) {
    try {
      const data = await this.prismaService.account.findMany(
        {
          skip: param.skip,
          take: param.take,
          where: {
            userId: param.userId,
            deletedAt: null,
            ...(param.accountName ? { accountName: { search: param.accountName } } : {})

          },

          orderBy: { createdAt: 'desc' },
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
      const data = await this.prismaService.account.findFirst({
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

  async update(id: string, updateAccountInput: any) {
    try {
      const data = await this.prismaService.account.update({
        where: {
          id: id,
        },
        data: {
          ...updateAccountInput,
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
      const data = await this.prismaService.account.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date()
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
