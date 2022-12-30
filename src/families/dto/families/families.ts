import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
} from 'class-validator';

export class FamiliesDTO {
  @IsString()
  @Length(3, 25)
  family: string;

  @IsOptional()
  @IsInt()
  @Max(3)
  total?: number;

  @IsOptional()
  @IsBoolean()
  confirm?: boolean;

  @IsOptional()
  @IsString()
  @IsUrl()
  qrcode?: string;

  @IsOptional()
  @IsArray()
  integrants?: Array<string>;
}
