import { ApiProperty } from '@nestjs/swagger';
import { DocType, Gender, MaritalStatus } from '@prisma/client';
import {
  Allow,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 'Mistico',
    required: true,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 'Clement',
    required: true,
  })
  lastName: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 'clementmistico@yopmail.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'rwanda',
    required: true,
  })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'NID',
    required: true,
  })
  docType: DocType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '120008117******',
    required: true,
  })
  docNumber: string;

  @ApiProperty({
    format: 'binary',
    description: 'document(ID|passport) file',
  })
  @Allow()
  docFile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'MALE',
    required: true,
  })
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'SINGLE',
    required: true,
  })
  maritalStatus: MaritalStatus;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: true,
    default: new Date(),
  })
  dob: Date;
}
