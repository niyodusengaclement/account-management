import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [CloudinaryModule],
})
export class ProfileModule {}
