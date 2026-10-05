import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { NormalizeWhitespace } from '../../../domain/user/transform/index.js';

export class LoginUserDto {
    @NormalizeWhitespace({ toLowerCase: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}