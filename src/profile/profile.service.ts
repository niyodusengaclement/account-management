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

@Injectable()
export class ProfileService {
  constructor(
    private cloudinary: CloudinaryService,
    private prisma: PrismaService,
  ) {}

  async findPendingRequests(user: JwtPayload) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    const requests = await this.prisma.user.findMany({
      where: { accountStatus: AccountStatus.PENDING },
    });
    return {
      message: 'Pending requests has been retrieved successfully',
      data: requests,
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
