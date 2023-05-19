import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthDto {
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
    default: 'mistico@yopmail.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must have at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character',
    },
  )
  @MinLength(8)
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'Pa$$w0rd',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Phone number without + sign',
    default: '250788000000',
    required: true,
  })
  phone: string;
}
