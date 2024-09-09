import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateAccountDto {
    @ApiProperty({
        required: true,
        title: "UserId",
        example: "123123",
        description: "Please insert the UserId"
    })
    @IsString()
    userId: string;

    @ApiProperty({
        required: true,
        title: "Username",
        example: "2000",
        description: "Please insert the UserId"
    })
    @IsNumber()
    balance: number;

    @ApiProperty({
        required: false,
        title: "Username",
        example: "Test",
        description: "Masukkan username anda"
    })
    @IsString()
    @IsOptional()
    currency?: string;
}
