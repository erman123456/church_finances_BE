import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { StatusResponse } from "../constans/global.constants";

export class ResponseDto {
    @ApiProperty({
        example: StatusResponse.Success,
    })
    @IsString()
    status: string;

    @ApiProperty({ example: 'Application Config Updated Successfully' })
    @IsString()
    message: string;

    data: any;
}
