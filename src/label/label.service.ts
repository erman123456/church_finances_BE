import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';

@Injectable()
export class LabelService {
  private response = new ResponseDto();
  constructor(private prismaService: PrismaService) { }
  create(createLabel: CreateLabelDto) {
    return this.prismaService.label.create({
      data: {
        ...createLabel,
      },
    });
  }


  async findAll() {
    try {
      const data = await this.prismaService.label.findMany({ orderBy: { createdAt: 'desc' } });
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
      const data = await this.prismaService.label.delete({
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
