import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { NormalizeWhitespace } from '../../../domain/user/transform/index.js';
import { UserRoleEnum } from '../../../domain/user/enum/index.js';

export class RegisterUserDto {
    @NormalizeWhitespace()
    @IsString()
    @IsNotEmpty()
    username: string;

    @NormalizeWhitespace({ toLowerCase: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;
}