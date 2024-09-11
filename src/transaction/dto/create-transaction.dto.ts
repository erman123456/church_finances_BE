import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { StatusApproval, TransactionType } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({
        required: true,
        title: "Account Id",
        example: "123123",
        description: "Please insert the AccountId"
    })
    @IsString()
    accountId: string

    @ApiProperty({
        required: true,
        title: "Label Id",
        example: "123123",
        description: "Please insert the LabelId"
    })
    @IsString()
    labelId: string

    @ApiProperty({
        required: true,
        title: "Ammount",
        example: "200000",
        description: "Please insert the Amount"
    })
    @IsNumber()
    amount: number

    @ApiProperty({
        required: false,
        title: "Type",
        example: "DEBIT/KREDIT",
        default: TransactionType.DEBET,
        description: "Please insert the Type"
    })
    @IsString()
    type: TransactionType

    @ApiProperty({
        required: false,
        title: "Status Approval",
        example: "APRROVED/MODIFY/REJECT",
        default: StatusApproval.APRROVED,
        description: "Please insert the Status Approval"
    })
    @IsOptional()
    @IsString()
    statusApproval: StatusApproval

    @ApiProperty({
        required: false,
        title: "Reason",
        example: "APRROVED/MODIFY/REJECT",
        default: "",
        description: "Please insert the Status Reason"
    })
    @IsString()
    @IsOptional()
    reason: string
}
