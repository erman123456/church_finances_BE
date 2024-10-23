import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { StatusApproval, TransactionType } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryTransactionDto {
    @ApiProperty({
        required: true,
        title: "Account Id",
        example: "123123",
        description: "Please insert the AccountId"
    })
    @IsString()
    accountId: string;

    @ApiProperty({
        required: true,
        title: "Label Id",
        example: "123123",
        description: "Please insert the LabelId"
    })
    @IsString()
    labelId: string;

    @ApiProperty({
        required: true,
        title: "Skip Page",
        example: "0",
        default: 0,
        description: "Please insert the Skip Page"
    })
    @IsNumber()
    skip: number;

    @ApiProperty({
        required: true,
        title: "Take Page",
        example: "10",
        default: 10,
        description: "Please insert the Take Page"
    })
    @IsNumber()
    take: number;
}
