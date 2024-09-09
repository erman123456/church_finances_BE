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
    return this.prismaService.account.findMany({orderBy: {createdAt: 'desc'}});
  }

  findOne(id: string) {
    return this.prismaService.account.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateActorInput: any) {
    return this.prismaService.account.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.account.delete({
      where: {
        id: id,
      },
    });
  }
}
