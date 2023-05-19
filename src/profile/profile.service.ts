import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccountStatus } from '@prisma/client';
import { JwtPayload } from 'src/common/interfaces';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class ProfileService {
  constructor(
    private cloudinary: CloudinaryService,
    private prisma: PrismaService,
    private otpService: OtpService,
  ) {}

  async findPendingRequests(user: JwtPayload) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Access denied. Only admins can request this endpoint',
      );
    }
    const requests = await this.prisma.user.findMany({
      where: { accountStatus: AccountStatus.PENDING },
    });
    return {
      message: 'Pending requests has been retrieved successfully',
      data: [
        requests.map((request) => {
          const { password, otp, ...rest } = request;
          return rest;
        }),
      ],
    };
  }

  async updateRequest(user: JwtPayload, id: string, status: AccountStatus) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Access denied. Only admins can request this endpoint',
      );
    }
    const record = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException('Record was not found');
    }
    if (record.accountStatus !== AccountStatus.PENDING) {
      throw new BadRequestException('Record is not pending');
    }
    this.otpService.sendSms(
      record.phone,
      `Your account has been updated to ${status}`,
    );
    if (record.email) {
      this.otpService.sendEmail(
        record.email,
        'Account Status updates',
        `Your account has been updated to ${status}`,
      );
    }

    await this.prisma.user.update({
      data: {
        accountStatus: status,
      },
      where: { id },
    });
    const { password, otp, ...rest } = record;
    rest.accountStatus = status;
    return {
      message: 'Record has been updated successfully',
      data: rest,
    };
  }

  async findOne(id: string) {
    const userById = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userById) {
      throw new NotFoundException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, otp, ...rest } = userById;
    return {
      message: 'Your profile information has been retrieved successfully',
      data: { ...rest },
    };
  }

  async update(id: string, profile: ProfileDto, file: Express.Multer.File) {
    try {
      const uploadImage = await this.cloudinary.uploadFile(file);

      const userById = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!userById) {
        throw new NotFoundException();
      }
      await this.prisma.user.update({
        data: {
          ...profile,
          docPath: uploadImage.url,
          accountStatus: AccountStatus.PENDING,
        },
        where: { id },
      });
      return {
        message: 'Your profile information has been updated successfully',
        data: {
          ...profile,
          docPath: uploadImage.url,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async uploadProfileImage(id: string, file: Express.Multer.File) {
    try {
      const uploadImage = await this.cloudinary.uploadFile(file);

      const userById = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!userById) {
        throw new NotFoundException();
      }
      await this.prisma.user.update({
        data: {
          profilePath: uploadImage.url,
        },
        where: {
          id,
        },
      });
      return {
        message: 'Your profile picture has been updated successfully',
        data: {
          url: uploadImage.url,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
