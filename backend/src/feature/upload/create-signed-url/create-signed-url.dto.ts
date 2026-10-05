import { IsOptional, IsString } from 'class-validator';
import { NormalizeWhitespace } from '../../../domain/upload/transform/index.js';

export class CreateSignedUrlDto {
  @IsOptional()
  @IsString()
  @NormalizeWhitespace()
  folder?: string;
}
