import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Family, FamilyDocument } from '../schemas/family.schema';
import { FamiliesDTO } from './dto/families/families';
import { InvitesService } from '../invites/invites.service';
import { UtilsService } from '../utils/utils.service';
import { InviteDocument } from '../schemas/invite.schema';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(Family.name)
    private readonly familyModel: Model<FamilyDocument>,
    private readonly inviteService: InvitesService,
    private readonly s3Services: S3Service,
    private readonly utils: UtilsService,
  ) {}

  async getFamilies() {
    return this.familyModel
      .find()
      .populate('integrants', { name: 1, lastname: 1 });
  }

  async getFamily(id: string) {
    return this.familyModel
      .findById(id)
      .populate('integrants', { name: 1, lastname: 1 });
  }

  async createFamily(family: FamiliesDTO) {
    const newFamily = new this.familyModel(family);
    newFamily.qrcode = await this.utils.qrcodeGenerator(
      newFamily._id.toString(),
    );
    return newFamily.save();
  }

  async updateFamily(id, family: FamiliesDTO) {
    return this.familyModel.findByIdAndUpdate(id, { ...family });
  }

  async deleteFamily(id) {
    await this.s3Services.deleteFile(id);
    return this.familyModel.findByIdAndDelete(id);
  }

  async addMember(id: string, member: InviteDocument) {
    return this.familyModel.updateOne(
      { _id: id },
      { $push: { integrants: member._id } },
    );
  }

  async removeMember(id: string, idMember: string) {
    const member = await this.inviteService.deleteInvite(idMember);
    return this.familyModel.updateOne(
      { _id: id },
      { $pull: { integrants: member?._id } },
    );
  }

  async deleteAll(id: string) {
    const families = await this.deleteFamily(id);
    return this.inviteService.deleteInvites(families.integrants);
  }

  async getDataMerge() {
    const families = await this.getFamilies();
    return this.utils.csvGenerator(families);
  }

  async confirmInvitation(id: string, comfirmation: boolean) {
    return this.familyModel.findByIdAndUpdate(id, { confirm: comfirmation });
  }
}
