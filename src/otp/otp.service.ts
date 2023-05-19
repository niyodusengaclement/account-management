import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { SMS_PASSWORD, SMS_SENDER, SMS_USER } from 'src/common/constants';

@Injectable()
export class OtpService {
  constructor(
    private config: ConfigService,
    private mailService: MailerService,
  ) {}
  async generateOtp(): Promise<{
    otpExpiresAt: Date;
    otp: number;
    hashedOtp: string;
  }> {
    const randomNbr = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 5);
    const salt = await bcrypt.genSalt();
    const hashedOtp = await bcrypt.hash(`${randomNbr}`, salt);
    return {
      otpExpiresAt,
      otp: randomNbr,
      hashedOtp,
    };
  }

  async sendOtp(phone: string, otp: number) {
    const message = `Here is your OTP ${otp}. Please don't share it with anyone. OTP is valid for only 5 min`;
    this.sendSms(phone, message);
  }

  async sendSms(phone: string, message: string) {
    const payload = {
      recipients: phone,
      sender: this.config.get(SMS_SENDER),
      message,
    };

    const formData = new URLSearchParams(payload);

    return await axios.post(
      'https://www.intouchsms.co.rw/api/sendsms/.json',
      formData,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        auth: {
          username: this.config.get(SMS_USER),
          password: this.config.get(SMS_PASSWORD),
        },
      },
    );
  }

  async sendEmail(email: string, subject: string, message: string) {
    const response = await this.mailService.sendMail({
      to: email,
      from: 'clementmistico@gmail.com',
      subject,
      text: message,
    });
    return response;
  }
}
