import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class CreateLabelDto {
    @ApiProperty({
        required: true,
        title: "AccountId",
        example: "banon",
        description: "Masukkan AccountId anda"
    })
    @IsString()
    accountId: string;
    
    @ApiProperty({
        required: true,
        title: "Nmae",
        example: "banon",
        description: "Masukkan nama label"
    })
    @IsString()
    name: string;
}
