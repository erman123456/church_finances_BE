import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    console.log("erman gg", process.env.DATABASE_URL_POSTGRESQL)
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_POSTGRESQL,
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
