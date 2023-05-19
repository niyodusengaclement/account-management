import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Phone number without + sign',
    default: '250788000000',
    required: true,
  })
  phone: string;

  @IsNumber()
  @Min(100000, {
    message: 'OTP should be six digits',
  })
  @Max(999999, {
    message: 'OTP should be six digits',
  })
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    required: true,
  })
  otp: number;
}
