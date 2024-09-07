import { ApiProperty } from "@nestjs/swagger";
import { StatusApproval, TransactionType } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty({
        required: true,
        title: "Account Id",
        example: "123123",
        description: "Please insert the AccountId"
    })
    @IsNumber()
    accountId: number

    @ApiProperty({
        required: true,
        title: "Label Id",
        example: "123123",
        description: "Please insert the LabelId"
    })
    @IsNumber()
    labelId: number

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
        default: TransactionType.DEBIT,
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
    reason: string
}
