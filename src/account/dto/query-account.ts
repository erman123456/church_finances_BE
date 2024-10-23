import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryAccountDto {
    @ApiProperty({
        required: false,
        title: "User Id",
        example: "123123",
        description: "Please insert the UserId"
    })
    @IsString()
    @IsOptional()
    userId: string;

    @ApiProperty({
        required: false,
        title: "Account Name",
        example: "Finance",
        description: "Please insert the Account Name"
    })
    @IsString()
    @IsOptional()
    accountName: string;

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
