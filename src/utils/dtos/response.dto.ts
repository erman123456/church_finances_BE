import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SetConfigDTOResponse {
    @ApiProperty({
        example: 200,
        enum: ['success', 'fail', 'error'],
    })
    @IsString()
    status: string;

    @ApiProperty({ example: 'CONFIG_SYSTEM_UPDATE' })
    @IsString()
    transaction_classify: string;

    @ApiProperty({ example: 'Application Config Updated Successfully' })
    @IsString()
    message: string;

    payload: any;
}
