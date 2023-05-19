import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): { status: number; message: string } {
    return { status: 200, message: 'Welcome to Account Management API' };
  }
}
