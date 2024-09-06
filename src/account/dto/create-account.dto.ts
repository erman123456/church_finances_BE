import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateAccountDto {
    @ApiProperty({
        required: true,
        title: "Username",
        example: "banon",
        description: "Masukkan username anda"
    })
    @IsNumber()
    userId: number;
    @ApiProperty({
        required: true,
        title: "Username",
        example: "banon",
        description: "Masukkan username anda"
    })
    @IsNumber()
    balance: number;

    @ApiProperty({
        required: false,
        title: "Username",
        example: "banon",
        description: "Masukkan username anda"
    })
    @IsString()
    currency?: string;
}
