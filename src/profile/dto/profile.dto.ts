import { ApiProperty } from '@nestjs/swagger';
import { DocType, Gender, MaritalStatus } from '@prisma/client';
import {
  Allow,
  IsDateString,
  IsEnum,
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
    required: false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    default: 'Clement',
    required: false,
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'rwanda',
    required: false,
  })
  country: string;

  @IsEnum([DocType.NID, DocType.PASSPORT])
  @ApiProperty({
    enum: [DocType.NID, DocType.PASSPORT],
    default: DocType.NID,
    required: true,
  })
  docType: DocType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: '120008117******',
    required: false,
  })
  docNumber: string;

  @ApiProperty({
    format: 'binary',
    description: 'document(ID|passport) file',
  })
  @Allow()
  docFile: string;

  @IsEnum([Gender.MALE, Gender.FEMALE])
  @ApiProperty({
    enum: [Gender.MALE, Gender.FEMALE],
    default: Gender.MALE,
    required: false,
  })
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'SINGLE',
    required: false,
  })
  maritalStatus: MaritalStatus;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    required: false,
    default: new Date(),
  })
  dob: Date;
}
