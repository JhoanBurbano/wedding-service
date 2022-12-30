import { Controller, Get } from '@nestjs/common';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesServices: InvitesService) {}

  @Get()
  async getInvites() {
    return await this.invitesServices.getInvites();
  }
}
