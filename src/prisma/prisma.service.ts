import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_MYSQL,
        },
      },
    });
  }
  cleanDb() {
    return this.$transaction([
      this.user.deleteMany(),
      this.account.deleteMany(),
      this.transaction.deleteMany(),
      this.label.deleteMany(),
    ]);
  }
}
