import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';

import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService
  ) { }


  async signIn(signInDto: SignInDto) {
    // find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    //compare password
    const pwMatches = await argon.verify(
      user.password,
      signInDto.password,
    );
    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    const response = {
      status: "success",
      message: "success",
      data: await this.signToken(user)
    }
    return response;
  }

  async signUp(signInDto: SignInDto) {
    const hash = await argon.hash(signInDto.password);

    await this.prismaService.user.create({
      data: {
        email: signInDto.email,
        password: hash,
        name: signInDto.name
      },
    }).then(async (res) => {
      await this.prismaService.account.create({
        data: {
          userId: res.id,
          balance: 0
        },
      }).catch((e) => {
        console.log(`account create ${e}`)
        throw new ExceptionsHandler(e)
      })
    }).catch((e) => {
      console.log(`user create ${e}`)
      throw new ExceptionsHandler(e)
    })
    return this.signToken(signInDto);
  }


  findAll() {
    return this.prismaService.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateActorInput: any) {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateActorInput,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
  async signToken(
    signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    const payload = {
      signInDto,
    };
    const token: string = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      access_token: token,
    };
  }
}
