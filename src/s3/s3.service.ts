import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private BUCKET: string;
  private BUCKET_REGION: string;
  private PUBLIC_ACCESS_KEY: string;
  private SECRET_KEY: string;
  private QR_PATH: string;
  private client: S3Client;
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.BUCKET = this.configService.get<string>('AWS.BUCKET');
    this.BUCKET_REGION = this.configService.get<string>('AWS.BUCKET_REGION');
    this.SECRET_KEY = this.configService.get<string>('AWS.SECRET_KEY');
    this.PUBLIC_ACCESS_KEY = this.configService.get<string>(
      'AWS.PUBLIC_ACCESS_KEY',
    );
    this.QR_PATH = this.configService.get<string>('AWS.QR_PATH');
    this.client = new S3Client({
      region: this.BUCKET_REGION,
      credentials: {
        accessKeyId: this.PUBLIC_ACCESS_KEY,
        secretAccessKey: this.SECRET_KEY,
      },
    });
  }

  async uploadFile(file: any) {
    const uploadParams = {
      Bucket: this.BUCKET,
      Key: `${this.QR_PATH}${file.name}`,
      Body: file.body,
      ContentEncoding: 'base64',
      ContentType: 'image/png',
      ACL: 'public-read',
    };
    const command = new PutObjectCommand(uploadParams);
    await this.client.send(command);
    return this.getAWSPath(file.name);
  }

  async deleteFile(id: string) {
    const path = this.QR_PATH + id + '.png';
    console.log('path', path);
    const command = new DeleteObjectCommand({
      Bucket: this.BUCKET,
      Key: path,
    });
    await this.client.send(command);
  }

  private getAWSPath(NAME: string) {
    return `https://${this.BUCKET}.s3.${this.BUCKET_REGION}.amazonaws.com/${this.QR_PATH}${NAME}`;
  }
}
