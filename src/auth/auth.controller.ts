import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthDto, OtpDto, SigninDto } from './dto';
import { NewPasswordDto } from './dto/new-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipThrottle()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin/otp-verification')
  signinOtpVerification(@Body() dto: OtpDto) {
    return this.authService.loginOtpVerification(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('magic-link/:email')
  magicLink(@Param('email') email: string) {
    return this.authService.magicLink(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('otp-verification')
  otpVerification(@Body() dto: OtpDto) {
    return this.authService.otpVerification(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('resend-otp/:phone')
  resendOtp(@Param('phone') phone: string) {
    return this.authService.resendOtp(phone);
  }

  @HttpCode(HttpStatus.OK)
  @Get('forgot-password/:email')
  forgotPassword(@Param('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('reset-password/:email/:token')
  resetPassword(
    @Body() dto: NewPasswordDto,
    @Param('email') email: string,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(email, token, dto.newPassword);
  }

  @ApiExcludeEndpoint()
  @HttpCode(HttpStatus.OK)
  @Get('logs')
  readLogs() {
    return this.authService.readLogs();
  }
}
