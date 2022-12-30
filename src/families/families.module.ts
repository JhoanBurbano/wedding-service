import { Family, FamilySchema, Invite, InviteSchema } from 'src/schemas/index';

import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { InvitesService } from 'src/invites/invites.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from 'src/s3/s3.service';
import { UtilsService } from 'src/utils/utils.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Family.name, schema: FamilySchema }]),
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService, InvitesService, S3Service, UtilsService],
})
export class FamiliesModule {}
