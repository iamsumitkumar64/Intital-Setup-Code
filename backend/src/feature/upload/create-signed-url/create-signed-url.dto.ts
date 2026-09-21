import { IsOptional, IsString } from 'class-validator';
import { NormalizeWhitespace } from 'src/infrastructure/validation/transforms';

export class CreateSignedUrlDto {
  @IsOptional()
  @IsString()
  @NormalizeWhitespace()
  folder?: string;
}
