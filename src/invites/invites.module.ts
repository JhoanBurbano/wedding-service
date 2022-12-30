import { Invite, InviteSchema } from '../schemas/invite.schema';

import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
  ],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
