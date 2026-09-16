import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRoleEnum } from 'src/domain/user/user.enum';

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @Transform(({ value }) => value?.toLowerCase().trim())
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;

    @IsEnum(UserRoleEnum)
    role: UserRoleEnum;
}