import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

class AddressDto {
  @ApiProperty()
  @IsString()
  line1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  line2?: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;
}

export class CreateContactDto {
  @IsString()
  @ApiProperty()
  firstName: string;
  @IsString()
  @ApiProperty()
  lastName: string;
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  birthDate: string;
  @IsString()
  @ApiProperty()
  sex: string;
  @ApiProperty()
  @Type(() => AddressDto)
  address: AddressDto;
}
