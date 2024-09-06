import { Injectable } from '@nestjs/common';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LabelService {
  constructor(private prismaService: PrismaService) {}
  create(createLabel: CreateLabelDto) {
    return this.prismaService.label.create({
      data: {
        ...createLabel,
      },
    });
  }

  findAll() {
    return this.prismaService.label.findMany();
  }

  findOne(id: number) {
    return this.prismaService.label.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateActorInput: any) {
    return this.prismaService.label.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.label.delete({
      where: {
        id: id,
      },
    });
  }
}
