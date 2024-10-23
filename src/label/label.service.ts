import { Injectable, Param } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';
import { QueryLabelDto } from './dto/query-label';

@Injectable()
export class LabelService {
  private response = new ResponseDto();
  constructor(private prismaService: PrismaService) { }
  async create(createLabel: CreateLabelDto) {

    try {
      const data = await this.prismaService.label.create({
        data: {
          ...createLabel,
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


  async findAll() {
    try {
      const data = await this.prismaService.label.findMany({
        where: {
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
      const data = await this.prismaService.label.findFirst({
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

  async findOneByQuery(query: QueryLabelDto) {
    try {
      const data = await this.prismaService.label.findMany({
        skip: query.skip,
        take: query.take,
        where: {
           accountId: query.accountId,
           deletedAt: null,
           ...(query.name ? { name: { search: query.name } } : {})
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

  async update(id: string, updateLabelInput: any) {
    try {
      const data = await this.prismaService.label.update({
        where: {
          id: id,
        },
        data: {
          ...updateLabelInput,
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
      const data = await this.prismaService.label.update({
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
