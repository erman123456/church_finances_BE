import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}
  create(createAccount: CreateAccountDto) {
    return this.prismaService.account.create({
      data: {
        ...createAccount,
      },
    });
  }

  findAll() {
    return this.prismaService.account.findMany();
  }

  findOne(id: number) {
    return this.prismaService.account.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateActorInput: any) {
    return this.prismaService.account.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.account.delete({
      where: {
        id: id,
      },
    });
  }
}
