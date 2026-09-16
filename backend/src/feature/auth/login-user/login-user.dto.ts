import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto {
    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}