import { IsOptional, IsString } from 'class-validator';
import { NormalizeWhitespace } from 'src/domain/common/transforms';

export class CreateSignedUrlDto {
  @IsOptional()
  @IsString()
  @NormalizeWhitespace()
  folder?: string;
}
