import { IsOptional, IsString } from 'class-validator';
import { NormalizeWhitespace } from 'src/domain/upload/transform';

export class CreateSignedUrlDto {
  @IsOptional()
  @IsString()
  @NormalizeWhitespace()
  folder?: string;
}
