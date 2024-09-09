import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({
        required: false,
        title: "Nmae",
        example: "banon",
        description: "Masukkan name anda"
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        required: true,
        title: "Email",
        example: "banon",
        description: "Masukkan email anda"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        title: "Username",
        example: "banon",
        description: "Masukkan username anda"
    })
    @IsString()
    password: string;
}
