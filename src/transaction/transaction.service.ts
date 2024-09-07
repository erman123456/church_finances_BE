import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}
  create(createTransaction: CreateTransactionDto) {
    return this.prismaService.transaction.create({
      data: {
        ...createTransaction,
      },
    });
  }

  findAll() {
    return this.prismaService.transaction.findMany();
  }

  findOne(id: number) {
    return this.prismaService.transaction.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateActorInput: any) {
    return this.prismaService.transaction.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.transaction.delete({
      where: {
        id: id,
      },
    });
  }
}
