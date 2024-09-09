import { PartialType } from '@nestjs/swagger';
import { SignInDto } from './signIn.dto';

export class UpdateUserDto extends PartialType(SignInDto) {}
