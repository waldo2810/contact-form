import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
  };
}
