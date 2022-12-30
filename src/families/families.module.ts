import { Family, FamilySchema } from '../schemas/family.schema';
import { Invite, InviteSchema } from '../schemas/invite.schema';

import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';
import { InvitesService } from '../invites/invites.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Service } from '../s3/s3.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Family.name, schema: FamilySchema }]),
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  controllers: [FamiliesController],
  providers: [FamiliesService, InvitesService, S3Service, UtilsService],
})
export class FamiliesModule {}
