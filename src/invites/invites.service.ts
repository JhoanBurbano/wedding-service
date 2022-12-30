import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from 'src/schemas/invite.schema';
import { InviteDTO } from './dto/invites.dto';

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
  ) {}

  async addInvite(invite: InviteDTO) {
    const newInvite = new this.inviteModel(invite);
    return newInvite.save();
  }

  async deleteInvite(id: string) {
    return this.inviteModel.findByIdAndDelete(id);
  }

  async getInvites(): Promise<Array<Invite>> {
    return this.inviteModel.find();
  }

  async deleteInvites(invites: Array<any>): Promise<void> {
    await this.inviteModel.deleteMany({ _id: { $in: invites } });
  }
}
