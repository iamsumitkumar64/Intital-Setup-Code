import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { NormalizeWhitespace } from 'src/infrastructure/validation/transforms';

export class LoginUserDto {
    @NormalizeWhitespace({ toLowerCase: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}