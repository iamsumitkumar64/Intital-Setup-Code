import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSignedUrlDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  folder?: string;
}
