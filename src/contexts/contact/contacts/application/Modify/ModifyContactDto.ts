import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ModifyContactDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  birthDate?: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  sex?: string;
  @ApiProperty()
  @IsOptional()
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}
