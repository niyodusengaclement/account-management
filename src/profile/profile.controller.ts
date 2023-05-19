import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggedUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { JwtPayload } from 'src/common/interfaces';
import { AccountStatus } from '@prisma/client';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/verification-requests')
  findPendingRequests(@LoggedUser() user: JwtPayload) {
    return this.profileService.findPendingRequests(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  findOne(@LoggedUser('id') userId: string) {
    return this.profileService.findOne(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/verification-requests/:id/approve')
  approveRequest(@LoggedUser() user: JwtPayload, @Param('id') id: string) {
    return this.profileService.updateRequest(user, id, AccountStatus.VERIFIED);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/verification-requests/:id/reject')
  rejectRequest(@LoggedUser() user: JwtPayload, @Param('id') id: string) {
    return this.profileService.updateRequest(user, id, AccountStatus.VERIFIED);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/info')
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('docFile'))
  update(
    @LoggedUser('id') userId: string,
    @Body() profile: ProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.update(userId, profile, file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profileImage: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('profileImage'))
  uploadPrroofileImage(
    @LoggedUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadProfileImage(userId, file);
  }
}
