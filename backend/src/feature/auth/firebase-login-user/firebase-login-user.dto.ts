import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseLoginUserDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
