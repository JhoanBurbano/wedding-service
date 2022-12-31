import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FamilyDocument } from '../schemas/family.schema';
import * as fs from 'fs';
import * as _path from 'path';
import * as qrcode from 'qrcode';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class UtilsService {
  private readonly WEB_APP_URL: string;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {
    this.WEB_APP_URL = this.configService.get<string>('CLIENT.WEB_APP_URL');
  }

  public csvGenerator(families: Array<FamilyDocument>) {
    const path = 'uploads/familiesList.csv';
    fs.writeFileSync(path, '', 'utf-8');
    const _families = JSON.parse(JSON.stringify(families));
    const fields = _families.map((family: FamilyDocument) => {
      return {
        ...family,
        _id: family._id.toString(),
      };
    });
    const content = [['name', 'code', '@qrcode']];
    fields.forEach((family: FamilyDocument) => {
      content.push([
        family.family,
        family._id.toString(),
        `/Users/jhoansebastianburbano/Documents/freelance/design/datamerge/${family._id}.png`,
      ]);
    });

    content.forEach((row) => fs.appendFileSync(path, row.join(',') + '\n'));
    const url = fs.readFileSync(path, { encoding: 'base64' });
    return { url };
  }

  async qrcodeGenerator(id: string) {
    try {
      const qr = await qrcode.toDataURL(
        (this.WEB_APP_URL as string) + '#confirm?code=' + id,
        {
          width: 400,
          color: {
            dark: 'F3B562',
            light: 'FFFFFF00',
          },
        },
      );
      const name = `${id}.png`;
      const body = Buffer.from(
        qr.replace(/^data:image\/\w+;base64,/, ''),
        'base64',
      );
      return await this.s3Service.uploadFile({
        name,
        body,
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  public fieldsToBD(body: Record<string, any>) {
    console.log('value', body);
    for (const property in body) {
      if (typeof body[property] === 'string') {
        const value = body[property] as string;
        body[property] = value.trim().toLocaleLowerCase();
      }
    }
    return body;
  }
}
