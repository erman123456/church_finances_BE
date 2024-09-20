import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';

@Injectable()
export class AccountService {
  private response = new ResponseDto();
  constructor(private prismaService: PrismaService) { }
  create(createAccount: CreateAccountDto) {
    return this.prismaService.account.create({
      data: {
        ...createAccount,
      },
    });
  }

  async findAll() {
    try {
      const data = await this.prismaService.account.findMany({ orderBy: { createdAt: 'desc' } });
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
      const data = await this.prismaService.account.delete({
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
