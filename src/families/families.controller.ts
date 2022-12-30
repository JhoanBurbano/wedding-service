import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesDTO } from './dto/families/families';
import { InvitesService } from 'src/invites/invites.service';
import { InviteDTO } from 'src/invites/dto/invites.dto';

@Controller('families')
export class FamiliesController {
  constructor(
    private readonly familyService: FamiliesService,
    private readonly inviteService: InvitesService,
  ) {}

  @Get()
  async getFamilies() {
    try {
      const families = await this.familyService.getFamilies();
      return families;
    } catch (error) {
      return error;
    }
  }

  @Get('/datamerge')
  async getDataMerge() {
    return await this.familyService.getDataMerge();
  }

  @Get('/:id')
  async getFamily(@Param('id') id: string) {
    return await this.familyService.getFamily(id);
  }

  @Post()
  async newFamily(@Body() body: FamiliesDTO) {
    const family = await this.familyService.createFamily(body);
    return family;
  }

  @Post('/:id')
  async addMember(
    @Body(new ValidationPipe()) member: InviteDTO,
    @Param('id') id: string,
  ) {
    try {
      const newMember = await this.inviteService.addInvite(member);
      await this.familyService.addMember(id, newMember);
      return 'success';
    } catch (error) {
      return 'failed';
    }
  }

  @Put('/:id')
  async updateFamily(@Param('id') id: string, @Body() family: FamiliesDTO) {
    try {
      return await this.familyService.updateFamily(id, family);
    } catch (error) {
      return error;
    }
  }

  @Delete('/:id')
  async deleteFamily(@Param('id') id: string) {
    try {
      return await this.familyService.deleteFamily(id);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id/:idmember')
  async removeMember(
    @Param('id') id: string,
    @Param('idmember') idmember: string,
  ) {
    try {
      await this.familyService.removeMember(id, idmember);
      return 'success';
    } catch (error) {
      return error;
    }
  }
}
