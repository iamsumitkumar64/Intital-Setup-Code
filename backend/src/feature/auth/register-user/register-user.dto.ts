import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRoleEnum } from 'src/domain/user/user.enum';
import { NormalizeWhitespace } from 'src/common/validation/transforms';

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