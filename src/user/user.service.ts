import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';

import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ResponseDto } from 'src/utils/dtos/response.dto';
import { StatusResponse } from 'src/utils/constans/global.constants';

@Injectable()
export class UserService {
  private response = new ResponseDto()
  constructor(
    private prismaService: PrismaService,
  ) {
  }


  async signIn(signInDto: SignInDto) {
    // find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      this.response.status = StatusResponse.Fail;
      this.response.message = 'The user not found in our database';
      return this.response;
    }
    //compare password
    const pwMatches = await argon.verify(
      user.password,
      signInDto.password,
    );
    //if password incorrect throw exception
    if (!pwMatches) {
      this.response.status = StatusResponse.Fail;
      this.response.message = 'The Credentials incorrect';
      return this.response;
    }
    this.response.status = StatusResponse.Success;
    this.response.message = 'Successfully to process'
    this.response.data = await this.signToken(user);
    return this.response;
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
        this.response.status = StatusResponse.Error;
        this.response.message = e.message
        return this.response;
      })
    }).catch((e) => {
      this.response.status = StatusResponse.Error;
      this.response.message = e.message
      return this.response;
    })
    this.response.status = StatusResponse.Success;
    this.response.message = 'Successfully to process'
    this.response.data = await this.signToken(signInDto);
    return this.response;
  }


  async findAll() {
    try {
      const data = await this.prismaService.user.findMany({ orderBy: { createdAt: 'desc' } });
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
      const data = await this.prismaService.user.findFirst({
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

  async update(id: string, updateUserInput: any) {
    try {
      const data = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateUserInput,
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
      const data = await this.prismaService.user.delete({
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
